import {createServer} from "node:http"
// import fs from "node:fs/promises"
import fs from "node:fs"

// console.log(await fs.readFile('./homePage.html'));


const server = createServer(async(req,res)=>{
     console.log("Request Received... ")
     // return
     // 1. sending a normal response form server
     // res.end("Hello from nodejs server");

     // 2. sending normal html file
     // res.writeHead(200,{
     //      'content-type':'text/html'
     // })
     // res.end('<h1>Hello Nodejs</h1>')


     // 3. Exploring the concept of routing in core nodejs
     // 4. Sending static file (separate .html file)
     if(req.url === "/"){
          res.writeHead(200,{
               'content-type':'text/html'
          })

          // res.end('<h1>Hello from Home page</h1>')
          // const filePath = await fs.readFile("./homePage.html");
          // res.end(filePath)

          // 5. Exploring file streaming in nodejs

          const dataStream = fs.ReadStream("./homePage.html");

          // dataStream.on('data',(chunk)=>{
          //      res.write(chunk);
          // })
          // dataStream.on('end',()=>{
          //      res.end()
          // })

          // 6. Now just piping both "event => data, end" using pipe
          dataStream.pipe(res)
     }else if(req.url === "/about"){
          res.writeHead(200,{
               'content-type':'text/html'
          })
          // res.end('<h1>Hello from About page</h1>')
          // const filePath = await fs.readFile("./aboutPage.html");
          // res.end(filePath)

          const dataStream = fs.createReadStream("./aboutPage.html");

          // dataStream.on('data',(chunk)=>{
          //      res.write(chunk)
          // })
          // dataStream.on('end',()=>{
          //      res.end();
          // })

          dataStream.pipe(res)
     }
})

const port = 9000;
server.listen(port,()=>{
     console.log(`server is running at http://localhost:${port}`)
})
