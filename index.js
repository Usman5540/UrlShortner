const express = require('express');
const app=express();
const path = require('path');// 
const port=3000;
const {DbConnection}=require('./connection');
const UrlRouter=require('./routes/user');
const ejsRouter=require('./routes/staticroutes')
// db connection 
DbConnection('mongodb://127.0.0.1:27017/UrlShortner').then(()=>{
    console.log('db is connected');
})
//setting up views for ejs 
app.set('view engine', 'ejs');// tells i am going to use ejs instead other like blaa for server side rendring 
app.set('views', path.resolve(__dirname, 'views')); // giving path whare my ejs file exists 

//middleware 
app.use(express.json());// for getting data as json 
app.use(express.urlencoded({extended:true})); // for getting data from form 

app.use("/url",UrlRouter);
app.use("/",ejsRouter);



app.listen(port,()=> console.log(`this server is running at port ${port}`));