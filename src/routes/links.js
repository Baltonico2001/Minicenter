const express= require('express');
const router= express.Router();
const pool= require('../database');



router.get('/principal',(req,res)=>
{
    res.render('principal');
});








module.exports= router;

