import app from "./src/app.js";
import dbConnect from "./src/db/db.js";

const port = process.env.PORT || 6060;

const startServer = async() => {
     await dbConnect();

     app.listen(port, ()=>{
          console.log(`server is running at http://localhost:${port}`)
     })
}

startServer();
