const express = require('express');
const router = express.Router();
const {login ,  createUser, getUsers } = require('../controllers/users');

  router.post('/login' , login);
  
  router.get('/' , getUsers)

  router.post('/' , createUser);
  
module.exports = router;