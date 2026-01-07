import {createServer} from "node:http"

const server = createServer((req,res)=>{
     console.log("Request Received... ")

     // 1. sending a normal response form server
     // res.end("Hello from nodejs server");

     // 2. sending normal html file
     // res.writeHead(200,{
     //      'content-type':'text/html'
     // })
     // res.end('<h1>Hello Nodejs</h1>')


     // 3. Exploring the concept of routing in core nodejs
     if(req.url === "/"){
          res.writeHead(200,{
               'content-type':'text/html'
          })

          res.end('Hello from Home page')
     }else if(req.url === "/about"){
          res.writeHead(200,{
               'content-type':'text/html'
          })
          res.end('Hello from About page')
     }
})

const port = 9000;
server.listen(port,()=>{
     console.log(`server is running at http://localhost:${port}`)
})
