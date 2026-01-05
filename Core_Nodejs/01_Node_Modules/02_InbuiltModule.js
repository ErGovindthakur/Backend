// here importing (userDefined) module
// old way

// import process from 'process';
const name = process.argv[2];

const getGreetings = require('./01_UserdefinedModule')

const hours = new Date().getHours();

const greet = getGreetings(hours);

console.log(`${greet}, ${name}`)
