'use strict'

const inicio = require ('../models/inicio')
//const listasusuarios = require('../models/listasusuarios')

// L I S T A R
async function listAll (req = null)
{ 
    const listAll = await inicio().listAll(req)
    return listAll
}



// A G R E G A R
async function insertar(req=null)
{
    const insertar= await inicio().insertar(req)
    return insertar
}
 // E L I M I N A R
async function eliminar (req = null)
{
    const eliminar = await inicio().eliminar(req)
    return eliminar
}
  // M O D I F I C A R

async function modificar (req = null)
{
    const modi = await inicio().modificar(req)
    return modi
}

  // A C T U A L I Z A R
async function actualizar (req = null) 
{
    const actualizar = await inicio().actualizar(req)
    return actualizar
}





module.exports = {
    listAll,
    insertar,
    eliminar,
    modificar,
    actualizar,
}