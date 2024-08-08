const express = require('express');
const router = express.Router();
const  {Url}=require('../models/user');
const {authentication,checkAuthorization}=require("../middleware/auth")
router.get('/', async (req,res)=>{
      try {

        // Render the bitly view and pass the userUrls
        res.render('bitly');
    } catch (error) {
        console.error('Error retrieving URLs:', error);
        res.status(500).send('Internal Server Error');
    }

})
router.get("/admin/analytic",authentication,checkAuthorization(["ADMIN"]),async(req,res)=>{
          if(!req.user) return res.redirect("/login");
          if(req.user.roles!=="ADMIN") res.end("unAuthorized");
          try {
                const userUrls=await Url.find({});
             res.render('Analytics', {userUrls });
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

router.get("/logout",async(req,res)=>{

     res.clearCookie('token'); // Clear the authToken cookie
  res.redirect('/'); // Redirect to the home page or login pag
})

router.get('/SignUp',(req,res)=>{
     res.render('SignUp');// it will took from Views folder
})
router.get("/login",(req,res)=>{
res.render('login');
})
module.exports=router;