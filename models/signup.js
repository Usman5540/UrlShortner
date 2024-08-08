const mongoose = require('mongoose');

     const SignUpSchema = new mongoose.Schema({

        name:{
            type:String,
            required:true,
        }
        , 
        email:{
            type:String,
            required:true ,
            Unique:true
        },
        password:{
            type:String,

        },
        roles:{
            type:String,
            required:true,
            default:"NORMAL"// IF USER EXISTS THEN IT WILL COMES WITH REQ.USER
        }
     })  
     const User = new mongoose.model("UserNew",SignUpSchema);
     module.exports=User;