// Exploring user defined module in js
import process from "process";

import { getGreeting } from "./01_BasicNode.js";

const name = process.argv[2];

const hours = new Date().getHours();

let greeter = getGreeting(hours);

console.log(`Hello ${name}, ${greeter}`);