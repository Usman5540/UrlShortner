const express=require('express');
const router = express.Router();

router.get('/',(req,res)=>{

     res.render("bitly");

})

router.get('/SignUp',(req,res)=>{
     res.render('SignUp');// it will took from Views folder
})
router.get("/login",(req,res)=>{
res.render('login');
})
module.exports=router;