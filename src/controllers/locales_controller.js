'use strict'

const locales = require('../models/locales')

// L I S T A R
async function listAll (req = null)
{ 
    const listAll = await locales().listAll(req)
    return listAll
}

// A G R E G A R
async function insertar(req=null)
{
    const insertar= await locales().insertar(req)
    return insertar
}
 // E L I M I N A R
async function eliminar (req = null)
{
    const eliminar = await locales().eliminar(req)
    return eliminar
}
  // M O D I F I C A R

async function modificar (req = null)
{
    const modi = await locales().modificar(req)
    return modi
}

  // A C T U A L I Z A R
async function actualizar (req = null) 
{
    const actualizar = await locales().actualizar(req)
    return actualizar
}





module.exports = {
    listAll,
    insertar,
    eliminar,
    modificar,
    actualizar,
}