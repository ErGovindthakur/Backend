import app from "./src/app"

const port = 5000;

const startServer = () => {
     app.listen(port, ()=>{
          console.log(`Server is running at port ${port}`)
     })
}

startServer();