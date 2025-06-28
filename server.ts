import app from "./src/app"
import { connectDB } from "./src/config/db";

const port = 5000;

const startServer = () => {
     connectDB()
     app.listen(port, ()=>{
          console.log(`Server is running at port ${port}`)
     })
}

startServer();