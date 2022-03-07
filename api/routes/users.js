const express = require('express');
const router = express.Router();
const {login ,  createUser, getUsers ,updateTodo } = require('../controllers/users');

  router.post('/login' , login);
  
  router.get('/:id' , getUsers);

  router.post('/' , createUser);

  router.patch('/:id' , updateTodo);
  
module.exports = router;
