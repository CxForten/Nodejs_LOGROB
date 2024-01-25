const express=require('express')
const router=express.Router()
const conexion=require('./database/db')



router.get('/',(req,res)=>{
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
router.get('/create', (req, res) => {
    const buscar = req.query.buscar;

    router.post('/create', (req, res) => {
        res.redirect('/create');
    });
    const crud=require('./controllers/crud')
    router.post('/store',crud.save)
    
  
    if (buscar) {
        conexion.query(`SELECT * FROM empleados WHERE departamento LIKE '%${buscar}%'`, (err, resultados) => {
            if (err) {
                throw err;
            } else {
                res.render('create', { resultados: resultados, buscar: buscar });
            }
        });
    } else {
        conexion.query('SELECT * FROM empleados', (err, resultados) => {
            if (err) {
                throw err;
            } else {
                res.render('create', { resultados: resultados });
            }
        });
    }
});

    module.exports=router