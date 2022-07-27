const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const varMiddleware = require('./middleware/variables')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'secret value',
    resave: false,
    saveUninitialized: false
}))
app.use(varMiddleware)
app.use(flash())

//Static
app.use(express.static('assets'))



//routes var
const homeRoutes = require('./routes/home.router')
const authRoutes = require('./routes/auth.router')
const taskRoutes = require('./routes/task.router')

//Routes
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/task', taskRoutes)

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const PORT = process.env.PORT || 3000
async function start(){
    try{
       
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        app.listen(PORT, () => {
            console.log(`Server start on ${PORT} port`);
        })
    }  catch(e){
        console.log(e);
    }
}

start()
