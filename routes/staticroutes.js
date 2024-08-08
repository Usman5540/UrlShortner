const express = require('express');
const router = express.Router();
const  {Url}=require('../models/user');
const {authentication}=require("../middleware/auth")
router.get('/', async (req,res)=>{
      try {

        // Render the bitly view and pass the userUrls
        res.render('bitly');
    } catch (error) {
        console.error('Error retrieving URLs:', error);
        res.status(500).send('Internal Server Error');
    }

})

router.get("/analytic",authentication,async (req,res)=>{
     if(!req.user) res.redirect("/login");// just for the sake of conformation 
   try {   // Fetch URLs for all users
    // to find all document write find({})
        const userUrls = await Url.find({objectId:req.user._id});// matching objecId from document and the which came with request
        // Render the bitly view and pass the userUrls
        // console.log(userUrls);
        res.render('Analytics', {userUrls });
    } catch (error) {
       
        console.error('Error retrieving URLs:', error);
        res.status(500).send('Internal Server Error');
    }
})



router.get('/SignUp',(req,res)=>{
     res.render('SignUp');// it will took from Views folder
})
router.get("/login",(req,res)=>{
res.render('login');
})
module.exports=router;