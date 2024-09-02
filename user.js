require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
port= process.env.PORT
const uri = process.env.MODEL_URI
app.set("view engine",'ejs')
const ejs = require('ejs');
const mongoose = require('mongoose')

app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:"mongodb+srv://DevBharadva:devbharadva1906@cluster0.28u0dtj.mongodb.net/todolist",collectionName:"sessions"}),
    cookie:{
        maxAge:1000*60*60*12   
     } 
}));

// const secret = process.env.JWT_SECRET

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev')) 
 
mongoose
.connect(uri)
.then(()=> console.log(`Database Conection SuccessFully...`))
.catch(err=>console.log(err));
    
const userRoutes = require('./routes/user.routes');

app.use('/',userRoutes)

app.listen(port,()=>{
    console.log(`server start`);   
})