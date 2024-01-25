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
        conexion.query(`SELECT * FROM empleados WHERE departamento LIKE '%${buscar}%'`, (error, resultados) => {
            if (error) {
                throw error;
            } else {
                res.render('create', { resultados: resultados, buscar: buscar });
            }
        });
    } else {
        conexion.query('SELECT * FROM empleados', (error, resultados) => {
            if (error) {
                throw error;
            } else {
                res.render('create', { resultados: resultados });
            }
        });
    }
});

router.post('/create', (req, res) => {
    res.redirect('/create');
});
const crud=require('./controllers/crud')
router.post('/store',crud.save)

//AGREGAR TAREA A LOS EMPLEADOS
router.get('/tareas',(req,res)=>{
    conexion.query('SELECT * FROM empleados',(error,resultados)=>{
        if(error)
        throw error
    else
    res.render('tareas',{resultados:resultados})
    })
})
router.post('/tareasfinal',crud.tareaxs)
router.get('/tareasmessage',(req,res)=>{
    res.render('tareasfin')

})

//TOTAL SALARIOS PAGADOS
router.get('/total', (req, res) => {
    // Consultar total en dólares de salarios pagados por fecha de contratación
    const consultaTotalSalariosPorFecha = `
      SELECT fechaContratacion, SUM(salario) as totalSalarios
      FROM empleados
      WHERE pagado = 1
      GROUP BY fechaContratacion
      ORDER BY fechaContratacion
    `;
  
    conexion.query(consultaTotalSalariosPorFecha, (error, empleadosPorFecha) => {
      if (error) {
        console.error('Error al consultar salarios por fecha: ' + error.stack);
        return res.status(500).send('Error en el servidor');
      }
  
      // Consultar el total general en dólares de salarios pagados
      const consultaTotalSalariosGeneral = `
        SELECT SUM(salario) as totalSalariosGeneral
        FROM empleados
        WHERE pagado = 1
      `;
  
      conexion.query(consultaTotalSalariosGeneral, (error, resultadoTotalSalarios) => {
        if (error) {
          console.error('Error al consultar total general de salarios: ' + error.stack);
          return res.status(500).send('Error en el servidor');
        }
  
        const totalSalariosGeneral = resultadoTotalSalarios[0].totalSalariosGeneral;
  
        // Renderizar la vista con los datos
        res.render('total', { empleadosPorFecha, totalSalariosGeneral });
      });
    });
  });
  
    module.exports=router