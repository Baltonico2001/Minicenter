
const express= require('express');
const router = express.Router();
const pool= require('../database');
const servicios_controller = require('../controllers/servicios_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await servicios_controller.listAll(req);
    res.render('servicios',{ver});

});

//////////////////////////////// AGREGAR MV /////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {fecha,energia,agua,gas,internet,camaras} = req.body;
    const inicio = {fecha,energia,agua,gas,internet,camaras};
    await servicios_controller.insertar(req);
    res.redirect('/servicios/inicio');

}); 


/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await servicios_controller.eliminar(id);
    res.redirect('/servicios/inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////


router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM servicios where id =?',[nico]);
    res.render('modificar/modi_servicios',{id});

});




router.post('/modificar/:id', async(req, res) => {
    await servicios_controller.modificar(req);
    res.redirect('/servicios/inicio');
});




module.exports= router;
