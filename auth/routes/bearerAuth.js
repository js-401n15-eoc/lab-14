'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer-auth-middleware.js');
const aclCheck = require('../middleware/acl-middleware.js');

router.get('/public-stuff', (req, res) => {
  res.send('public page for anyone');
});

router.get('/secret', bearerAuth, (req, res) => {
  res.status(200).send(`Welcome back, ${req.user.username}`);
});

router.get('/hidden-stuff', bearerAuth, (req, res) => {
  res.send(`Hi, ${req.user.username}. Here is the hidden page!`);
});

router.get('/something-to-read', bearerAuth, aclCheck('read'), (req, res) => {
  res.send('You can read! Whoo!');
});

router.post('/create-a-thing', bearerAuth, aclCheck('create'), (req, res) => {
  res.send('You can create! Whoo!');
});

router.put('/update', bearerAuth, aclCheck('update'), (req, res) => {
  res.send('You can update! Whoo!');
});

router.patch('/jp', bearerAuth, aclCheck('update'), (req, res) => {
  res.send('You can...jp?! Whoo!');
});

router.delete('/bye-bye', bearerAuth, aclCheck('delete'), (req, res) => {
  res.send('You can delete! Bye-bye!');
});

module.exports = router;
