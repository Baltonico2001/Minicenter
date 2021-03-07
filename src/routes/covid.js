
const express= require('express');
const router = express.Router();
const pool= require('../database');
const covid_controller = require('../controllers/covid_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await covid_controller.listAll(req);
    res.render('covid',{ver});

});

//////////////////////////////// AGREGAR MV /////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {nombre,apellido,telefono,temperatura,sintomas} = req.body;
    const inicio = {nombre,apellido,telefono,temperatura,sintomas};
    await covid_controller.insertar(req);
    res.redirect('/covid/inicio');

}); 


/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await covid_controller.eliminar(id);
    res.redirect('/covid/inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////


router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM covid where id =?',[nico]);
    res.render('modificar/modi_covid',{id});

});




router.post('/modificar/:id', async(req, res) => {
    await covid_controller.modificar(req);
    res.redirect('/covid/inicio');
});




module.exports= router;
