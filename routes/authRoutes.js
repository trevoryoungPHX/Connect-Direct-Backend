const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')

router.post('/signup', function(req, res) {
  // Should have some validation for security
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    req.body.password = hash
    knex('users')
      .insert(req.body)
      .returning('*')
      .then(newUser => res.send(newUser[0]))
  })
})

router.post('/login', function(req, res) {
  knex('users')
    .where('email', req.body.email)
    .then(user => {
      if (user.length > 0) {
        let token = jwt.sign({ user }, 'secret-string')
        res.send({
          user,
          token
        })
      } else {
        res.status(401).send('Invalid Login')
      }
    })
})

router.get('/user', function(req, res) {
  res.send({ name: 'james' })
})

router.get('/refresh', function(req, res) {
  res.send({ name: 'james' })
})

module.exports = router
