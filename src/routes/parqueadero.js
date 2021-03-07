
const express= require('express');
const router = express.Router();
const pool= require('../database');
const parqueadero_controller = require('../controllers/parqueadero_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await parqueadero_controller.listAll(req);
    res.render('parqueadero',{ver});

});



//////////////////////////////// AGREGAR MV /////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {clientes,vehiculo,placas,hora_entrada,hora_salida,total} = req.body;
    const inicio = {clientes,vehiculo,placas,hora_entrada,hora_salida,total};
    await parqueadero_controller.insertar(req);
    res.redirect('/inicio');

}); 


/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await parqueadero_controller.eliminar(id);
    res.redirect('/montar_inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////


router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM parqueadero where id =?',[nico]);
    res.render('modificar/modi_parqueadero',{id});

});




router.post('/modificar/:id', async(req, res) => {
    await parqueadero_controller.modificar(req);
    res.redirect('/parqueadero/inicio');
});




module.exports= router;
