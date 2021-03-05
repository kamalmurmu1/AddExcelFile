/* Require modules and files */
const express=require('express');
const router=express.Router();
const controller=require('../controller/controller');

// Routes

router.post('/addExcelFile',controller.PostRequest);

module.exports=router;
