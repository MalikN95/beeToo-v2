const { json } = require('express');
const Task = require('../models/Task')

module.exports.addTask = async function(req, res){
    const {userName, userEmail, text} = req.body
    const task = await new Task({
        userName,
        userEmail,
        text
    }).save()
    res.redirect('/')
}

module.exports.completedTask = async function(req, res){
    try{
        const {taskId, taskStatus} = req.body
        const task = await Task.findByIdAndUpdate(taskId, {
            completed: taskStatus
        })
        res.json(task.completed)
    } catch(err){
        console.log(req.body);
    }
}

module.exports.findForUpdateTask = async function(req, res){
    try{
        const {taskId} = req.body
        const task = await Task.findById(taskId.delelem)
        res.json(task)
    } catch(err){
        console.log(err);
    }
}

module.exports.updateTask = async function(req, res){
    const {userName, userEmail, text, taskId} = req.body
    try{
        const task = await Task.findByIdAndUpdate(taskId, {
            userName,
            userEmail,
            text,
            changed: true
        })
        res.redirect('/')
    } catch(err){
        console.log(err);
    }
}


