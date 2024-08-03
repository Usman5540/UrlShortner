const express =require('express');
const router=express.Router();
const {SignUP,login}=require('../controllers/NewUser');
router.post('/SignUp',SignUP);
router.post('/login',login);
module.exports=router;
