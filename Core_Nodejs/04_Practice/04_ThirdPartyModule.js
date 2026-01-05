import chalk from "chalk";
import md5 from "md5";
import readline from "node:readline";
import { stdin, stdout } from "process";

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const hashedCode = md5("pass@123");

function askPassword() {
  rl.question("What is your password: ", (input) => {
    const hashedInput = md5(input);

    if (hashedInput === hashedCode) {
      console.log(chalk.green("You are welcome ✅"));
      rl.close();
    } else {
      console.log(chalk.red("Incorrect password ❌"));
      askPassword(); // retry
    }
  });
}

askPassword();
