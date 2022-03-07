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

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const sid = JSON.stringify(id)
        console.log(typeof (sid));
        console.log(sid);
        console.log(id);
        const tasks = req.body.tasks;
        console.log(tasks)
        const user = await User.findById(id)
        console.log(user)
        user.tasks = tasks;
        console.log(user.tasks);
        const a1 = await user.save();
        console.log(user)
        this.tasks = user.tasks
    } catch (err) { 
        res.send('ERROR' + err);
    }
}

module.exports = { login, getUsers, createUser, updateTodo };
