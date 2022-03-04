const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');


  const login = async(req , res)=> {
    users = await User.find();
    //console.log(users);
    const user = users.find((user) =>user.username === req.body.username);
    // console.log(user);
   if(user == null) {
    return res.status(400).send("Cannot find user");
    }
    try {
    if(await bcrypt.compare(req.body.password , user.password)) {
        res.send(true);
    } else {
        res.send(false);
    }
   }catch{
    res.status(500).send();
  }
}

 const createUser = async(req , res)=> {
     users = await User.find();
     if(users.find((user) =>user.email === req.body.email)) {
         res.send(false);
     }
    else{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password , 10)
    const user = new User({
        email:req.body.email,
        username:req.body.username,
        password:hashedPassword
    })  
    console.log(user);
    try{
    const a1 = await user.save();
    // res.json(a1);
    res.send(true);
     }catch(err) {
    res.send('ERROR');
}
    }
}


const getUsers = async(req , res) => {
    try {
         users = await User.find();
        res.json(users);
    }catch(err) {
        res.send('ERROR '+ err);
    }
};
 module.exports = {login  , getUsers , createUser};