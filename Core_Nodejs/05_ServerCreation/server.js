import {createServer} from "node:http"

const server = createServer((req,res)=>{
     console.log("Request Received -> ")

     res.end("Hello from nodejs server");
})

const port = 9000;
server.listen(port,()=>{
     console.log(`server is running at http://localhost:${port}`)
})
