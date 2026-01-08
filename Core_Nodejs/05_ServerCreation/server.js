import { createServer } from "node:http";
// import fs from "node:fs/promises"
import fs from "node:fs";
// import fsPromises from "node:fs/promises"

// console.log(await fs.readFile('./homePage.html'));

// let count = 0;

const server = createServer(async (req, res) => {
  console.log("Request Received... ");
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
  // if(req.url === "/"){
  //      res.writeHead(200,{
  //           'content-type':'text/html'
  //      })

  //      // res.end('<h1>Hello from Home page</h1>')
  //      // const filePath = await fs.readFile("./homePage.html");
  //      // res.end(filePath)

  //      // 5. Exploring file streaming in nodejs

  //      const dataStream = fs.ReadStream("./homePage.html");

  //      // dataStream.on('data',(chunk)=>{
  //      //      res.write(chunk);
  //      // })
  //      // dataStream.on('end',()=>{
  //      //      res.end()
  //      // })

  //      // 6. Now just piping both "event => data, end" using pipe
  //      dataStream.pipe(res)
  // }else if(req.url === "/about"){
  //      res.writeHead(200,{
  //           'content-type':'text/html'
  //      })
  //      // res.end('<h1>Hello from About page</h1>')
  //      // const filePath = await fs.readFile("./aboutPage.html");
  //      // res.end(filePath)

  //      const dataStream = fs.createReadStream("./aboutPage.html");

  //      // dataStream.on('data',(chunk)=>{
  //      //      res.write(chunk)
  //      // })
  //      // dataStream.on('end',()=>{
  //      //      res.end();
  //      // })

  //      dataStream.pipe(res)
  // }else if(req.url === "/expenses"){
  //      // expense tracker
  //      // create Apis
  //      // Post

  //      // 7. Explore diff types of http methods
  //      if(req.method === 'POST'){
  //           // read data from request
  //           let buff = '';
  //           req.on('data',(chuck)=>{
  //                // console.log('chuck -> ',chuck)
  //                buff = buff + chuck.toString();
  //           })
  //           req.on('end',async()=>{
  //                const data = await fsPromises.readFile('./db.json')
  //                const dbData = JSON.parse(data)
  //                dbData.push(JSON.parse(buff));

  //                await fsPromises.writeFile('./db.json',JSON.stringify(dbData,null,2))

  //                res.end('OK')
  //           })
  //           // store it into json db
  //      }else if(req.method === 'GET'){
  //           // read data from json db
  //           const dbData = await fsPromises.readFile('./db.json');
  //           res.end(dbData)
  //           // return to the client
  //      }
  // }

  // 8. nodejs server sent "even-stream"

  if (req.url === "/") {
    const htmlPage = fs.ReadStream("./eventStream.html");

    htmlPage.pipe(res)
  } else if (req.url === "/stream") {
    res.writeHead(200, {
       // "content-type":"application/json" (for json data)
      // "content-type":"text/html" (for html or text data)
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });

    let count = 0;

    setInterval(() => {
      res.write(`data: Message ${++count}\n\n`);
    }, 2000);
  }
});

const port = 9000;
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
