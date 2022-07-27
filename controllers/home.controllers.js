const Task = require('../models/Task')

let sortValueHelper = false

module.exports.homePage = async function(req, res){
    try{
        const {skip} = req.query
        const sortParams = req.params.sort
        let sortValue
        if(sortValueHelper){
            sortValue = -1
        } else{
            sortValue = 1
        }
        if(!skip){
            sortValueHelper = !sortValueHelper
        }
        const tasks = await Task.find()
            .sort({[sortParams]: [sortValue]})
            .skip(skip)
            .limit(3)
            .lean()
        const tasksCount = await Task.find()
        const paginationLenth = Math.ceil(tasksCount.length / 3)
        res.render('index', {
            isHome: true,
            title: 'Главная страница',
            tasks,
            paginationLenth
        })
    }
    catch(err) {
        console.log(err);
    }
}
