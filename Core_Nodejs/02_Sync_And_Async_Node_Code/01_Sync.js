console.log("Learn"); // sync code (call stack) # 1

setTimeout(()=>{
     console.log('Build'); // async code macro task # 3
},0)

console.log("Success"); // sync code (call stack) # 2