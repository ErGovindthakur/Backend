// writing error middleware code

export const errorMiddleware = (err:any,req:any,res:any,next:any) => {
     console.log(err.stack);

     res.status(err.statusCode || 500).json({
          success:false,
          message:err.message || "server Error"
     })
}