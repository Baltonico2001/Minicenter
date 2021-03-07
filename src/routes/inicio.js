
const express= require('express');
const router = express.Router();
const pool= require('../database');
const inicio_controller = require('../controllers/inicio_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await inicio_controller.listAll(req);
    res.render('inicio',{ver});

});


router.get('/montar_inicio',async(req,res)=>
{
    const ver = await inicio_controller.listAll(req);
    res.render('montar_inicio',{ver});

});

//////////////////////////////// AGREGAR MV pregunta user/////////////////////////////////////////////////////////////////
router.post('/insertar',async(req,res)=>
{
    const {nombre,pregunta_recomendacion} = req.body;
    const inicio = {nombre,pregunta_recomendacion};
    await inicio_controller.insertarr(req);
    res.redirect('/inicio');

}); 


//////////////////////////////// AGREGAR MV montar inicio/////////////////////////////////////////////////////////////////


router.post('/agregar',async(req,res)=>
{
    const {titulo,descripcion} = req.body;
    const inicio = {titulo,descripcion};
    await inicio_controller.insertar(req);
    res.redirect('/montar_inicio');

}); 


/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await inicio_controller.eliminar(id);
    res.redirect('/montar_inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////

router.post('/modifi/:id', async(req, res) => {
    await usuariosController.modi(req);
    res.redirect('/usuarios/inicio');
});













module.exports= router;
