const express = require('express');
const app = express();
const path = require ('path');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',require('./router'))
app.listen(5000, ()=>{
    console.log("Server is running on port http://localhost:5000")
})