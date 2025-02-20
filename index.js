const express = require('express');
const { resolve } = require('path');
const {connect} = require('mongoose');
const User = require("./schema.js")

require('dotenv').config(); 
const app = express();
app.use(express.json());
const port = 5544;
const db_url = process.env.MONGO_URL

app.use(express.static('static'));



app.post('/api/users' , async(req , res)=>{
  try{
    const {name, email, password} = req.body ; 
    const newData = new User({name, email, password}) ;
    await newData.save() ;

    res.status(201).json({message : "User created Succesfully."})
  }
  catch(error){
    if(error.name == "ValidationError"){
      res.status(400).send({message : "Validation Error" , details : error.message})
    }
    else{
      res.status(500).send({message : "Server Error" , details : error.message})
    }
  }
})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const connectToDb = async(url)=>{
  await connect(url)
}

app.listen(port, async() => {
  try{

    await connectToDb(db_url)
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('connected to DataBase')
  }
  catch(err){
    console.log(err)
  }
});
