const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app=express();
const path = require('path');// 
// const port=3000;
const {DbConnection}=require('./connection');
const UrlRouter=require('./routes/user');
const ejsRouter=require('./routes/staticroutes')

app.use(express.static('public'));
// Access environment variables
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000; // default to 3000 if PORT is not set

console.log('MONGODB_URI:', mongoURI); // Check if this logs the correct value
console.log('PORT:', port); // Check if this logs the correct value
const Url='mongodb+srv://urlboy:urlboy@urlshortner.ldrgj3q.mongodb.net/?retryWrites=true&w=majority&appName=UrlShortner'
// db connection 
DbConnection(Url).then(()=>{
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
module.export=app;