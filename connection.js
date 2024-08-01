const mongoose= require('mongoose');

async function DbConnection(url){

    await mongoose.connect(url);
}
module.exports={  
    DbConnection
}