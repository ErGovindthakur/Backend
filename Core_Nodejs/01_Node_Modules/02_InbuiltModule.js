// here importing (userDefined) module
// old way

// import process from 'process';
const name = process.argv[2];

// const getGreetings = require('./01_UserdefinedModule')

// import getGreetings from "./01_UserdefinedModule.js";
import {getGreetings} from "./01_UserdefinedModule.js";

const hours = new Date().getHours();

const greet = getGreetings(hours);

// console.log(`${greet}, ${name}`)


// Exploring inbuilt module

import os from "node:os"

// console.log("CPUs",os.cpus()) // cpu info
// console.log("CPUs",os.cpus().length) // total core
console.log("Total Memory ",Math.floor(os.totalmem()/(1024*1024*1024))) // total memory in GB
console.log("Free Memory ",Math.floor(os.freemem()/(1024*1024*1024))) // total free memory in GB
console.log("Uptime ",Math.floor(os.uptime()/(60*60)));
console.log("Hostname ", os.hostname())
console.log("User Info ", os.userInfo())
console.log("Machine Architecture ", os.machine())