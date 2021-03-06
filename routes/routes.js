const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const jwt = require('jsonwebtoken')
const encryptor = require('../config/encryption.js');

const secret = "trevdev.co"

router.post('/user/signup', function(req, res) {
    encryptor.hash(req.body).then((user)=>{
      knex('users')
        .insert(user)
        .returning('*')
        .then(newUser => res.json({user:newUser[0], msg:"Account created! Click the link above to sign!"}))
    })
})

router.post('/user/login', function(req, res) {
  knex('users')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        encryptor.check(user[0], req.body).then((isValid)=>{
          if(isValid) {
            let token = jwt.sign({user:user[0]}, secret)
            res.json({
              user:user[0],
              token:token
            })
          } else {
            res.status(401).json({errMsg:"Invalid Login - Please Try Again"})
          }
        })
      } else {
        res.status(401).json({errMsg:"Invalid Login - Please Try Again"})
      }
    })
})

router.post('/seeker/signup', function(req, res) {
    encryptor.hash(req.body).then((user)=>{
      knex('seekers')
        .insert(user)
        .returning('*')
        .then(newUser => res.json({user:newUser[0], msg:"Account created! Click the link above to sign!"}))
    })
})

router.post('/seeker/login', function(req, res) {
  knex('seekers')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        encryptor.check(user[0], req.body).then((isValid)=>{
          if(isValid) {
            let token = jwt.sign({user:user[0]}, secret)
            res.json({
              user:user[0],
              token:token
            })
          } else {
            res.status(401).json({errMsg:"Invalid Login - Please Try Again"})
          }
        })
      } else {
        res.status(401).json({errMsg:"Invalid Login - Please Try Again"})
      }
    })
})

router.post('/admin/login', function(req, res) {
  knex('admins')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        encryptor.check(user[0], req.body).then((isValid)=>{
          if(isValid){
            let token = jwt.sign({user:user[0]}, secret)
            res.json({
              user:user[0],
              token:token
            })
          }else{
            res.status(401).json({errMsg:"Access DENIED"})
          }
        })
      } else {
        res.status(401).json({errMsg:"Access DENIED"})
      }
    })
})

router.use(jwtAuth);

// GET user info to display first name on user page

router.get('/userInfo', function(req, res) {
  knex('users').where('users.id', req.decoded.user.id).then(user => res.json(user[0]))
})

// GET seeker info to display first name on user page

router.get('/seekerInfo', function(req, res) {
  knex('seekers').where('seekers.id', req.decoded.user.id).then(seeker => res.json(seeker[0]))
})

// GET request for all opportunities, join with seeker table

router.get('/allOpportunities', function(req, res) {
  knex('opportunities')
  .join("seekers", "seekers.id", "opportunities.seeker_id")
  .select("opportunities.id as op_id", "opportunities.*", "seekers.*")
  .then(opportunities => res.json(opportunities))
});


// POST request on user profile page to update their info

router.post('/updateUser', function(req, res) {
  knex('users').update({first_name:req.body.user.first_name, last_name: req.body.user.last_name, email:req.body.user.email, job_title: req.body.user.job_title, company_name:req.body.user.company_name, linkedin_url:req.body.user.linkedin_url}).where('id', req.decoded.user.id).then(function() {
    res.json("success")
  });
});

// POST request on user seeker page to update their info

router.post('/updateSeeker', function(req, res) {
  knex('seekers').update({first_name:req.body.seeker.first_name, last_name: req.body.seeker.last_name, email:req.body.seeker.email, job_title: req.body.seeker.job_title, organization_name:req.body.seeker.organization_name}).where('id', req.decoded.user.id).then(function() {
    res.json("success")
  });
});

// POST requst to info_request table on a specific opportunity

router.post('/postInfo', function(req, res) {
  console.log(req.body);
  knex('info_requests').insert({opportunity_id:req.body.opportunity_id, message:req.body.message, user_id: req.decoded.user.id}).then(() => {
    knex('info_requests').select().then(info_requests => res.json({info_requests:info_requests, msg:"Message sent! The organizer will receive your email address and LinkedIn profile and will get back to you if they are interested."}))
  });
});

// POST for seeker to post a new opportunity

router.post('/opportunities', function(req, res) {
  knex('opportunities').insert({...req.body, seeker_id: req.decoded.user.id}).then(() => {
    knex('opportunities').select().orderBy("id", "DESC").then(opportunities => res.json({opportunities:opportunities, msg:"New Post Submitted! See Below."}))
  });
});

// DELETE request for seeker to delete an old post

router.delete('/opportunities/:id', function(req, res) {
  console.log(req.params.id);
  knex('opportunities').del().where({id: req.params.id}).then(() => {
    knex('opportunities').select().then(opportunities => res.json(opportunities))
   });
});

// GET request for all seekers posts double joined with info requsts and users.

router.get('/posts/getone', function(req, res) {
  knex('opportunities')
      .select()
      .where('opportunities.seeker_id', req.decoded.user.id)
      .orderBy("id", "DESC")
      .then((results)=> {
        knex('info_requests')
        .join('users', 'info_requests.user_id', 'users.id')
        .then((requests) => {
          for(let i = 0; i < results.length; i++) {
            results[i].messages = requests.filter((req) => {
                return results[i].id === req.opportunity_id
              })
          }
          res.json(results)
        })
  }
)
});

//4 get alls for admin panel

router.get('/portal/users', function(req, res) {
  knex('users').select().then(users => res.json(users))
});

router.get('/portal/seekers', function(req, res) {
  knex('seekers').select().then(seekers => res.json(seekers))
});

router.get('/portal/opportunities', function(req, res) {
  knex('opportunities').select().then(opportunities => res.json(opportunities))
});

router.get('/portal/info_requests', function(req, res) {
  knex('info_requests').select().then(info_requests => res.json(info_requests))
});

//4 deletes for admin panel

router.delete('/portal/users/delete/:id', function(req, res) {
  knex('users').del().where('id', req.params.id).then(function() {
    knex('users').select().then(users => res.json(users))
  });
});

router.delete('/portal/seekers/delete/:id', function(req, res) {
  knex('seekers').del().where('id', req.params.id).then(function() {
    knex('seekers').select().then(seekers => res.json(seekers))
  });
});

router.delete('/portal/opportunities/delete/:id', function(req, res) {
  knex('opportunities').del().where('id', req.params.id).then(function() {
    knex('opportunities').select().then(opportunities => res.json(opportunities))
  });
});

router.delete('/portal/info_requests/delete/:id', function(req, res) {
  knex('info_requests').del().where('id', req.params.id).then(function() {
    knex('info_requests').select().then(info_requests => res.json(info_requests))
  });
});



// Anything below this is protected and has access too req.decoded




module.exports = router




function jwtAuth(req, res, next){
 //send as a query parameter!
 var token = req.body.token || req.query.token || req.headers['x-access-token'];
 // decode token
 if (token) {

   // verifies secret and checks exp
   jwt.verify(token, secret, function(err, decoded) {
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });
     } else {
       // if everything is good, save to request for use in other routes
       req.decoded = decoded;
       next();
     }
   });

 } else {

   // if there is no token
   // return an error
   return res.status(403).send({
       success: false,
       message: 'No token provided.'
   });
 }
}
