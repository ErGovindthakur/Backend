#!/usr/bin/env node

import process from "process";
import { getGreeting } from "./01_BasicNode.js";

const name = process.argv[2];
const hours = new Date().getHours();

let greeter = getGreeting(hours);
console.log(`Hello ${name}, ${greeter}`);
