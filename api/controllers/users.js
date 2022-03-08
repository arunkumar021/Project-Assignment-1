const bcrypt = require('bcrypt');
const user = require('../models/user');
const User = require('../models/user');
const { ObjectId } = require('mongodb')
// const { findById } = require('../models/user');


const login = async (req, res) => {
    users = await User.find();
    //console.log(users);
    const user = users.find((user) => user.username === req.body.username);
    // console.log(user);
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send(user._id);
        } else {
            res.send(false);
        }
    } catch {
        res.status(500).send();
    }
}

const createUser = async (req, res) => {
    users = await User.find();
    if (users.find((user) => user.email === req.body.email)) {
        res.send(false);
    }
    else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        console.log(user);
        try {
            const a1 = await user.save();
            // res.json(a1);
            res.send(true);
        } catch (err) {
            res.send('ERROR');
        }
    }
}

const getUsers = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(typeof(id))
        const users = await User.findById(id);
        //    console.log(users);
        res.json(users);
    } catch (err) {
        res.send('ERROR ' + err);
    }
};

 const submitTodo = async(req , res) => {
     try {
         const id = req.params.id;
         const task = req.body.tasks;
         console.log(task)
         const user = await User.findById(id);
         user.tasks = task;
         console.log(user.tasks)
         await user.save();
         res.send(user.task)
        }catch(err) {
       res.send("ERROR" + err);
     }
 };

 const deleteToDo = async(req , res) => {
     try{
         const id = req.params.id;
         const index = req.body.ind;
         console.log(index);
         const user = await User.findById(id);
         console.log(user.tasks);
         user.tasks.splice(index , 1);
         await user.save();
         console.log(user.tasks);
     } catch(err) {
         res.send("ERROR" , err);
     }
  }

  const changeStatus = async (req , res) => {
       try {
           const id = req.params.id;
           const {status , index} = req.body;
           console.log(status);
           const user = await User.findById(id);
           user.tasks[index].status = status;
           await user.save();
           user.tasks.forEach((t)=>{console.log(t.status)});
           console.log('---------------');
       } catch (error) {
           res.send("ERROR" , error);
       }
  }
 



module.exports = { login, getUsers, createUser, submitTodo ,deleteToDo , changeStatus};
