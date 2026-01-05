// Creating a System Monitoring ClI App using basic nodejs module

import os from "node:os";

// console.log(os.cpus()[0].times)
// console.log(`Total Memory -> ${((os.totalmem)/(1024*1024*1024)).toFixed(1)}`)

// console.log(`Free Memory -> ${((os.freemem)/(1024*1024*1024)).toFixed(1)}`)

// console.log("Total Used Memory",((os.totalmem - os.freemem)/(1024*1024*1024)).toFixed(1))


let monitor = () => {
     // console.log("Monitoring...")

     // 1. Old Cpu snapshot
     // 2. New Cpu snapshot

     let oldCpus = os.cpus();

     setTimeout(()=>{
          let newCpus = os.cpus();

          let usage = newCpus.map((cpu,i)=>{
               return{
                    core:i,
                    usage:calculateUsage(oldCpus[i],newCpus[i])+"%"
               }
          })

          console.clear();
          console.table(usage);
          console.log(`Memory Used -> ${((os.totalmem - os.freemem)/(1024*1024*1024)).toFixed(1)}% / ${((os.totalmem)/(1024*1024*1024)).toFixed(1)}%`)
     },1000)
}

setInterval(monitor,1000)

let calculateUsage = (oldCpus,newCpus) => {

     let oldTotal = Object.values(oldCpus.times).reduce((a,b)=>a+b);

     let newTotal = Object.values(newCpus.times).reduce((a,b)=>a+b);

     let idle = newCpus.times.idle - oldCpus.times.idle;

     let total = newTotal - oldTotal;

     let used = total - idle;

     return ((100*used)/total).toFixed(1)
}