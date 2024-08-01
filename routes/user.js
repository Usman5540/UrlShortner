const express=require('express');
const router=express.Router();
const {UrlGenerator,Response,Analysis}=require("../controllers/user");

router.post("/",UrlGenerator);
router.get("/:Shortid",Response)
router.get('/analysis/:Shortid',Analysis);
module.exports=router;