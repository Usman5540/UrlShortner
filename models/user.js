const mongoose = require('mongoose'); // incorrect import 
// const {schema}=mongoose; an other way 

const urlSchema= new mongoose.Schema({

     Shortid:{
        type:String,
        required:true, // it must be created with uniqueness
        unique:true
     },

     redirectUrl:{
        type:String,
        required:true,

     }
     ,
     visitHistory:[
        {timestamp:{type:Number}} // this string will store history in number type object 

     ]
     ,
     objectId:{
       type: mongoose.Schema.Types.ObjectId,// this is used to reference the object in collectin 
       ref:"UserNew"// reference the model which created this url from sginup model 
     }

})
const Url= new mongoose.model('User',urlSchema);

module.exports = {Url};