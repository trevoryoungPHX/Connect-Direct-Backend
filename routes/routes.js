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
        .then(newUser => res.json(newUser[0]))
    })
})

router.post('/user/login', function(req, res) {
  knex('users')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        encryptor.check(user[0], req.body).then((isValid)=>{
          let token = jwt.sign({user:user[0]}, secret)
          res.json({
            user:user[0],
            token:token
          })
        })
      } else {
        res.status(401).json('Invalid Login')
      }
    })
})

router.post('/seeker/signup', function(req, res) {
    encryptor.hash(req.body).then((user)=>{
      knex('seekers')
        .insert(user)
        .returning('*')
        .then(newUser => res.json(newUser[0]))
    })
})

router.post('/seeker/login', function(req, res) {
  knex('seekers')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        encryptor.check(user[0], req.body).then((isValid)=>{
          let token = jwt.sign({user:user[0]}, secret)
          res.json({
            user:user[0],
            token:token
          })
        })
      } else {
        res.status(401).json('Invalid Login')
      }
    })
})

router.post('/admin/login', function(req, res) {
  knex('admins')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        encryptor.check(user[0], req.body).then((isValid)=>{
          let token = jwt.sign({user:user[0]}, secret)
          res.json({
            user:user[0],
            token:token
          })
        })
      } else {
        res.status(401).json('Invalid Login')
      }
    })
})

// Anything below this is protected and has access too req.decoded
router.use(jwtAuth);

module.exports = router

function jwtAuth(req, res, next){
 //send as a query parameter!
 var token = req.body.token || req.query.token || req.headers['x-access-token'];
 console.log(token);
 // decode token
 if (token) {

   // verifies secret and checks exp
   jwt.verify(token, secret, function(err, decoded) {
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });
     } else {
       // if everything is good, save to request for use in other routes
       req.decoded = decoded;
       console.log(req.decoded);
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
