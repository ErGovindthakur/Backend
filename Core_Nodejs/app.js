import process from "process";
// console.log(process.argv)

/*
since we are using here -:
 process.argv[2], process.argv[3] (not 0,1)

 bcz nodejs (process.argv) always returns an array already occupied index 0,1 
 (0th index contains=> .exe file path), 
 (1st index contains => your actual file path of code)
*/


/*
eg -> 
console.log(process.argv)
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\HP\\Documents\\BackEnd_With_Hitesh\\Core_Nodejs\\app.js'
]
=> 
*/
// console.log(process.argv[2],process.argv[3])

let n = process.argv[2];

function printTriangle(){
     for(let i = 1; i<=n; i++){
          for(let j = 1; j<=i; j++){
               process.stdout.write("* ")
          }
          console.log()
     }
}

printTriangle()