'use strict'

const pool =  require('../database')

module.exports = function() 
{
    // L I S T A R
    async function listAll(req) 
    {
        let query = ('SELECT * FROM mantenimientos ')

        const data = await pool.query(query)
        return data
    }

     // A G R E G A R
    async function insertar(req,res)
    {
        await pool.query('insert into mantenimientos set ?',[req.body]);
    }
    // E L I M I N A R
    async function eliminar(req)
    {
        const elim = await pool.query ('DELETE FROM mantenimientos where id = ?',[req]);
        return elim
    }
    // M O D I F I C A R

    async function modificar(req,res)
    {
        const {id} = req.params;
        await pool.query('UPDATE mantenimientos set ? where id=?',[req.body,id]);
    }

     async function actualizar(req,res)
    {
        const {id}  = req.params;
        await pool.query('UPDATE mantenimientos set ? where id =?' ,[req.body,id]);
    }



    return{
      listAll,
      insertar,
      eliminar,
      modificar,
      actualizar,

    }
}
