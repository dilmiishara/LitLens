import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app= express();

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome To MERN Stack tutorial')
});


mongoose 
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to databse');     
        app.listen(PORT,()=>{
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });