// console.log('Day_1 of Backend')

require('dotenv').config()
 const express = require('express') //-: common js
// import express from 'express'  //-: module js

const app = express()
const port = 3000  // approx 65 thousand port available

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// twitter route
app.get('/twitter', (req,res) =>{
     res.send('Calling twitter')
})

// login route
app.get('/login', (req,res) => {
     res.send('<h1>Login function is calling </h1>')
})

// youtube route
app.get('/youtube', (req,res) => {
     res.send('<h2>Go to youtube and Learn something </h2>')
})

// Server is listen on port
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})