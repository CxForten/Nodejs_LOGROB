const express=require('express')
const app=express()
const path=require('path')
const expressLayouts=require('express-ejs-layouts')
const flash = require('express-flash')
const session = require('express-session')

app.set('view engine','ejs')
app.set('port',process.env.PORT||3000)

app.use(flash());

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({
    secret:'misecreto',
    resave:false,
    saveUninitialized:true
}))


app.use('/',require('./router'))

app.listen(app.get('port'),()=>{
    console.log(`conexion exitosa con http://localhost:${app.get('port')}`)
})