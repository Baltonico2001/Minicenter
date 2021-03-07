
const express= require('express');
const router = express.Router();
const pool= require('../database');
const personal_controller = require('../controllers/personal_controller')

//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await personal_controller.listAll(req);
    res.render('personal',{ver});

});

//////////////////////////////// AGREGAR MV /////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {nombre,apellido,cedula,telefono,cargo,salario} = req.body;
    const inicio = {nombre,apellido,cedula,telefono,cargo,salario};
    await personal_controller.insertar(req);
    res.redirect('/personal/inicio');

}); 


/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////
router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await personal_controller.eliminar(id);
    res.redirect('/personal/inicio')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////


router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM personal where id =?',[nico]);
    res.render('modificar/modi_personal',{id});

});




router.post('/modificar/:id', async(req, res) => {
    await personal_controller.modificar(req);
    res.redirect('/personal/inicio');
});




module.exports= router;
