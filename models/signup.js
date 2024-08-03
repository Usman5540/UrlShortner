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

        }
     })  
     const User = new mongoose.model("UserNew",SignUpSchema);
     module.exports=User;