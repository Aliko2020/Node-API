const express = require('express');
const mongoose = require('mongoose')
const ProductModel = require("./models/product.model")
require("dotenv").config()

    //initializing app
const app = express();

    //env's
const Port = process.env.PORT
const ConnectionString = process.env.CONNECTIONSTRING

    //middlewares
app.use(express.json());

    //database connections
mongoose.connect(ConnectionString)
    .then(()=>{
        console.log("DatabaseConnected");
        app.listen(Port, ()=> {
            console.log(`Server running on: ${Port}`);
      })
    })
    .catch(()=>{
        console.log("Connection Failed");
    })

    //create product
app.post('/api/products',async (req,res)=>{
    try{
        const product = await ProductModel.create(req.body)
        res.status(200).json(product)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})


    //fetching all products 
app.get('/',(req,res)=>{
    ProductModel.find({})
    .then(product => res.json(product))
    .catch ((error)=> console.log(error))
})

    //getting a product  by id
app.get('/api/product/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await ProductModel.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})