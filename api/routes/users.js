const express = require('express');
const router = express.Router();
const {login ,  createUser, getUsers , submitTodo, deleteToDo , changeStatus} = require('../controllers/users');

  router.post('/login' , login);
  
  router.get('/:id' , getUsers);

  router.post('/' , createUser);

  router.patch('/submit/:id' , submitTodo);

  router.patch('/delete/:id' , deleteToDo)

  router.patch('/changeStatus/:id' , changeStatus);
  
module.exports = router;
