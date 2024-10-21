// Creating our server here

import express from "express";

const app = express()

// Creating our route here

// app.get('/', (req,res) => {
//      res.send('<h1>Server is Ready</h1>')
// })

// Creating a middleware

app.use(express.static('dist'));

// Creating our second route to send our json data
app.get('/api/jokes',(req,res) => {
     const jokes = [
          {
               id:1,
               title:'first',
               joke:'This is our first joke'
          },
          {
               id:2,
               title:'second',
               joke:'This is our second joke'
          },
          {
               id:3,
               title:'third',
               joke:'This is our third joke'
          }
     ]
     res.send(jokes)
})

const port = process.env.PORT || 7000

app.listen(port,() => {
     console.log(`Server is running at http://localhost:${port}`)
})