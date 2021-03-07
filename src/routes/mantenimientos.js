
const express= require('express');
const router = express.Router();
const pool= require('../database');
const mantenimientos_controller = require('../controllers/mantenimientos_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await mantenimientos_controller.listAll(req);
    res.render('mantenimientos',{ver});

});

//////////////////////////////// AGREGAR MV /////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {locales,estructura,servicios,parqueadero,jardin,descripcion} = req.body;
    const inicio = {locales,estructura,servicios,parqueadero,jardin,descripcion};
    await mantenimientos_controller.insertar(req);
    res.redirect('/mantenimientos/inicio');

}); 


/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await mantenimientos_controller.eliminar(id);
    res.redirect('/mantenimientos/inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////


router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM mantenimientos where id =?',[nico]);
    res.render('modificar/modi_mantenimientos',{id});

});




router.post('/modificar/:id', async(req, res) => {
    await mantenimientos_controller.modificar(req);
    res.redirect('/mantenimientos/inicio');
});




module.exports= router;
