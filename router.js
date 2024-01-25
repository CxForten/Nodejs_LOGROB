const express = require('express');
const router = express.Router();
const conexion = require('./database/db');

router.get('/', (req, res)=>{
    res.render('index')
    // conexion.query('SELECT * FROM users',(error, results)=>{
    //     if(error){
    //         throw error;
    //     }else{
    //         res.send(results);
    //     }
    // })
})

//RUTA PARA CREAR REGISTROS
router.get('/create', (req, res)=>{
    res.render('create')
})

router.post('/create', (req, res) => {
    res.redirect('/create');
});
const crud=require('./controllers/crud')
router.post('/store',crud.save)

module.exports=router;