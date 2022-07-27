const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports.auth = async function(req, res) {
    res.render('auth', {
        title: 'Авторизация',
        error: req.flash('errorLogin')
    })
}


module.exports.login = async function(req, res) {
    const {login, password} = req.body
    try{
        if(login === process.env.ADMIN_LOGIN){
            const areSame = password === process.env.ADMIN_PASSWORD
            if (areSame) {
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err){
                        throw err
                    }
                    res.redirect('/')
                })
            } else{
                req.flash('errorLogin', 'Не корректный пароль')
                res.redirect('/auth')
            }
        } else {
            req.flash('errorLogin', 'Не корректный логин')
            res.redirect('/auth')
        }
    } catch(e){
        console.log(e);
    }
}

module.exports.logout = async function(req, res){
    req.session.destroy(()=> {
        res.redirect('/')
    })
}