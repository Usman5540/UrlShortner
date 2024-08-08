const express=require('express');
const router=express.Router();
const {UrlGenerator,Response,Analysis}=require("../controllers/user");
const{checkAuthorization}=require("../middleware/auth")
router.post("/",UrlGenerator);
router.get("/:Shortid",checkAuthorization(["NORMAL","ADMIN"]),Response)// IF GET THE POINT OF INCLUDES THEN GOOD TO GO WHICH CHECKS
// roles.incudles(NORMAL or ADMIN) is this roles===>(NORMAL,ADMIN) include or mean exist in up comming request req.user
router.get('/analysis/:Shortid',Analysis);
module.exports=router;