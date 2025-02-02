// 1)
const asyncHandler = (fn) => async(err,req,res,next) => {
     try {
          await fn(err,req,res,next)
     } catch (err) {
          res.status(err.code || 500).json({
               success:false,
               message:err.message
          })
     }
}

// 2)
// const asyncHandler2 = (fn2) => {
//      (err,req,res,next)=>{
//           Promise.resolve(fn2(err,req,res,next)).catch((err)=>{
//                next(err)
//           })
//      }
// }
export {asyncHandler}