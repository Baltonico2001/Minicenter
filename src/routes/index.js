
const express= require('express');
const router = express.Router();
const pool= require('../database');
const inicio_controller = require('../controllers/inicio_controller')
const preguntas_controller = require('../controllers/preguntas_controller')








//////////////////////////////// CONSULTAR MV /////////////////////////////////////////////////////////////////

router.get('/inicio',async(req,res)=>
{
    const ver = await inicio_controller.listAll(req);
    const pre = await preguntas_controller.listAll(req);
    res.render('inicio',{ver,pre});

});

//////////////////////////////// CONSULTAR MV preguntas /////////////////////////////////////////////////////////////////

    


router.get('/montar_inicio',async(req,res)=>
{
    const ver = await inicio_controller.listAll(req);
    res.render('montar_inicio',{ver});

});

router.post('/insertar',async(req,res)=>
{
    const {nombre,pregunta_recomendacion} = req.body;
    const inicio = {nombre,pregunta_recomendacion};
    await preguntas_controller.insertar(req);
    res.redirect('/inicio');

}); 




//////////////////////////////// AGREGAR MV /////////////////////////////////////////////////////////////////


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
router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM inicio where id =?',[nico]);

    res.render('modificar/inicio',{id});

});

router.post('/modificar/:id', async(req, res) => {
    await inicio_controller.modificar(req);
    res.redirect('/montar_inicio');
});











router.get('/administracion',(req,res)=>
{
    res.render('administracion');
});








module.exports= router;














//////////////////////////////////// U S U A R I O S  MC ///////////////////////////////////////////////////////////

//////////////////////////////////// L I S T A R  MC ///////////////////////////////////////////////////////////

/*router.get('/usuarios',async(req,res)=>
{
    const usuarios = await usuariosController.listAll(req);
    res.render('secciones/usuarios',{usuarios});

});


//////////////////////////////////// A G R E G A R  MC ///////////////////////////////////////////////////////////


router.post('/agregar',async(req,res)=>
{
    const {nombre,cedula,telefono,direccion,rol} = req.body;
    const nuevo_usua = {nombre,cedula,telefono,direccion,rol};
    await usuariosController.insertar(req);
    res.redirect('/usuarios')

});

//////////////////////////////////// E L I M I N A R  MC ///////////////////////////////////////////////////////////


router.get('/eliminar/:id',async(req,res)=>
{
    const {id} = req.params;
    await usuariosController.eliminar(id);
    res.redirect('/usuarios')
    
});

//////////////////////////////////// M O D I F I C A R  MC ///////////////////////////////////////////////////////////


/*router.post('/editar/:id', async(req, res) =>
 {
    const id = await usuariosControllers.modificar(req);
    res.redirect('links/add',{id});
});


router.get('/editar-usuario/:id', async(req, res) =>
 {
    const {dato} = req.params          
    await usuariosControllers.actualizar(req);
    res.redirect('/usuarios');
});*/



/*router.get('/editar/:id',async(req,res)=>
{
    const {id} = req.params;
    await usuariosController.modificar(id);
    res.render('links/add',{id})
    //console.log(req.params);
});


router.post('/editar-usuario/:nico',async(req,res)=>
{
    const {nico} = req.params;
     await usuariosController.modificar(nico);
    res.redirect('/usuarios');
});


//////////////////////////////////// P R O D U C T O S  MC ///////////////////////////////////////////////////////////
//////////////////////////////////// L I S T A R  MC ///////////////////////////////////////////////////////////

/*router.get('productos',async(req,res)=>
{
    const productos = await productosController.listAll(req);
    res.render('secciones/productos',{productos});

});













router.get('/productos',(req,res)=>
{
    res.render('secciones/productos');
});

router.get('/pedidos',(req,res)=>
{
    res.render('secciones/pedidos');
});

router.get('/principal',(req,res)=>
{
    res.render('principal');
});


/*{
    //res.json({status:'ok' }); 
})

router.get('my',async(req,res)=>
{
    const usuarios = await usuariosController.listlogued(req);
    //res.json({usuarios})
})

router.post('/search', async (req,res)=> 
{
    const usuarios = await usuariosController.listAll(req.body);
    //res.json({usuarios});
})


///////////////////////////////////////////////////////////////////////////////////////////////




router.get('/',(req,res)=>
{
    res.render('registro');
});

///////////////////////////////////////////////////////////////////////////////////////////////


router.get('/principal',(req,res)=>
{
    res.render('principal');
});



///////////////////////////////////////////////////////////////////////////////////////////////

router.post('/regi',async(req,res)=>
{
    const {nombre,contraseña} = req.body;
	const regis = {nombre,contraseña};
	await pool.query('insert into registros set ?',[regis]);

	res.redirect('principal')
});

router.post('/registrado',(req,res)=>
{
    res.render('principal');
});
///////////////////////////////////// P A R C I A L //////////////////////////////////////////////////////////

router.get('/parcial',async(req,res)=>
{
    const dato = await pool.query('SELECT * FROM usuarios');
    res.render('parcial/principal',{dato});

});

router.post('/por_id/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const dato = await pool.query('SELECT * FROM usuarios where id =?',[nico]);
            
    res.render('parcial/user',{dato});
});

router.post('/editar-usuario/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const {post} = req.body;
    const actualizar={post};
    const id = await pool.query('UPDATE usuarios set ? where id =? ',[actualizar,nico]);
    res.redirect('/parcial')
});

router.post('/agre',async(req,res)=>
{
 const {post} = req.body;
 const agre = {post};
 await pool.query('insert into post post ?',[agre]);

 res.redirect('/parcial');
});

router.get('/post',async(req,res)=>
{
    const dato = await pool.query('SELECT * FROM post');
    res.render('/parcial',{dato});

});







/////////////////////////////////// SECCCIONES ///////////////////////////////////////////////////////////////
//////////////////////////////// U S U A R I O S ///////////////////////////////////////////////////////////////

////////////////////////////////// CONSULTAR /////////////////////////////////////////////////////////////////////

/*router.get('/usuarios',async(req,res)=>
{
    const dato = await pool.query('SELECT * FROM usuarios');
    res.render('secciones/usuarios',{dato});

});*/


//////////////////////////////// AGREGAR /////////////////////////////////////////////////////////////////



/*router.post('/usua',async(req,res)=>
{
 const {nombre,cedula,telefono,direccion,rol} = req.body;
 const nuevo_usua = {nombre,cedula,telefono,direccion,rol};
 await pool.query('insert into usuarios set ?',[nuevo_usua]);

 res.redirect('/usuarios');
});*/
    
/////////////////////////////  ELIMINAR /////////////////////////////////////////////////////////////////

/*router.get('/eliminar/:nico',async(req,res)=>
{
            const {nico} = req.params;
            await pool.query('DELETE FROM usuarios where id = ? ',[nico]);

res.redirect('/usuarios');
        
});*/
 
/////////////////////////////// MODIFICAR ///////////////////////////////////////////////////////////////////

/*router.get('/editar/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM usuarios where id =?',[nico]);

    res.render('links/add',{id});
});


router.post('/editar-usuario/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const {nombre,cedula,telefono,direccion,rol} = req.body;
    const actualizar={nombre,cedula,telefono,direccion,rol};
    const id = await pool.query('UPDATE usuarios set ? where id =? ',[actualizar,nico]);
    res.redirect('/usuarios')
});


//////////////////////////////P R O D U C T O S ///////////////////////////////////////////////////////////////////
/////////////////////////////////CONSULTAS////////////////////////////////////////////////////////////////////

/*router.get('/productos',async (req,res)=>
{
    const dato = await pool.query('SELECT * FROM productos');
    res.render('secciones/productos',{dato});
});

/////////////////////////////////AGREGAR////////////////////////////////////////////////////////////////////


router.post('/produ',async(req,res)=>
{
 const {nombre,valor} = req.body;
 const nuevo_produ = {nombre,valor};
 await pool.query('insert into productos set ?',[nuevo_produ]);

 res.redirect('/productos');
});

//////////////////////////////////ELIMINAR//////////////////////////////////////////////////////////////////

router.get('/eliminar_produ/:nico',async(req,res)=>
{
            const {nico} = req.params;
            await pool.query('DELETE FROM productos where id = ? ',[nico]);

res.redirect('/productos');
        
});

///////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////////////

router.get('/modificar',(req,res)=>
{
    res.render('links/modifi');
});



router.get('/editar_produ/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const id = await pool.query('SELECT * FROM productos where id =?',[nico]);
            

    res.render('links/modifi',{id});
});


router.post('/editar-produ/:nico',async(req,res)=>
{
    const {nico} = req.params;
    const {nombre,valor} = req.body;
    const actualizar_produ={nombre,valor};
    const balto = await pool.query('UPDATE productos set ? where id =? ',[actualizar_produ,nico]);
    res.redirect('/productos')
});


////////////////////////////////////////////////////////////////////////////////////////////////////



router.get('/pedidos',(req,res)=>
{
    res.render('secciones/pedidos');
});



router.get('/roles',(req,res)=>
{
    res.render('secciones/roles');
});

router.get('/configuracion',(req,res)=>
{
    res.render('secciones/configuracion');
});


/////////////////////////////////// RUTAS PRINCIPALES PARA LAS CONSULTAS ////////////////////////////////////////////////////////////

router.get('/mejores_clientes',(req,res)=>
{
    res.render('consultas_bd/mejores_clientes');
});


router.get('/mas_vendido',(req,res)=>
{
    res.render('consultas_bd/producto_mas_vendido');
});


router.get('/ulti_ventas',(req,res)=>
{
    res.render('consultas_bd/ultimas_ventas');
});

router.get('/grafica',(req,res)=>
{
    res.render('consultas_bd/grafica');
});

router.get('/detalle',(req,res)=>
{
    res.render('secciones/ver_detalle_pedido');
});

router.get('/agregar_pedido',(req,res)=>
{
    res.render('secciones/agregar_pedido');
});*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports= router;

