
const express= require('express');
const router = express.Router();
const pool= require('../database');
const preguntas_controller = require('../controllers/preguntas_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await preguntas_controller.listAll(req);
    res.render('preguntas',{ver});

});

//////////////////////////////// AGREGAR MV user/////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {nombre,pregunta_recomendacion} = req.body;
    const inicio = {nombre,pregunta_recomendacion};
    await preguntas_controller.insertar(req);
    res.redirect('/inicioo');

}); 

//////////////////////////////// AGREGAR MV admi /////////////////////////////////////////////////////////////////



/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await preguntas_controller.eliminar(id);
    res.redirect('/preguntas/inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////


router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM preguntas where id =?',[nico]);
    res.render('modificar/modi_preguntas',{id});

});


router.post('/modificar/:id', async(req, res) => {
    await preguntas_controller.modificar(req);
    res.redirect('/preguntas/inicio');
});




module.exports= router;
