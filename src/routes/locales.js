const express= require('express');
const router = express.Router();
const pool= require('../database');
const locales_controller = require('../controllers/locales_controller')




router.get('/local1',async(req,res)=>
{
    const id = await locales_controller.listAll(req);
    res.render('locales/local1',{id});

});

//////////////////////////////// AGREGAR MV local1/////////////////////////////////////////////////////////////////
router.post('/agregar',async(req,res)=>
{
    const {fecha,arrendatario,telefono,ocupacion_local,observaciones,pago} = req.body;
    const inicio = {fecha,arrendatario,telefono,ocupacion_local,observaciones,pago};
    await locales_controller.insertar(req);
    res.redirect('/local1');

}); 
/////////////////////////////  ELIMINAR MV /////////////////////////////////////////////////////////////////


router.get('eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await locales_controller.eliminar(id);
    res.redirect('/local1')
    
});

/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////
router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM local1 where id =?',[nico]);
    res.render('modificar/modi_local1',{id});

});
router.post('modificar/:id', async(req, res) => {
    await locales_controller.modificar(req);
    res.redirect('/local1');
});




















router.get('/locales',async(req,res)=>
{
    const id = await locales_controller.listAll(req);
    res.render('locales',{id});

});















module.exports= router;
