// import * as fs from "node:fs";
// import fs from "node:fs/promises"

function createFile1(pathname) {

     // portion -> 1
  // sync api testing (blocking code ) don't use in production
//   fs.writeFileSync(pathname, "Hello Nodejs"); // it completely replace prev file
//   fs.appendFileSync(pathname,"Hello JavaScript"); // it simply write in prev file 
//   console.log("File has been created !");

// portion -> 2
  // Async Api of nodejs
  // Note => Error first callbacks (first param is error in callback)
  fs.writeFile(pathname,'Hello Nodejs!\n',(err)=>{
     if(err){
          console.log("Something went wrong while writing file");
          return;
     }


     fs.appendFile(pathname,'Hello JavaScript!',(err)=>{
     if(err){
          console.log("Something went wrong while writing file");
          return;
     }

     console.log("File has been appended asynchronously")
  })
     console.log("File has been written asynchronously")
  })

  // Portion -> 3
//   fs.appendFile(pathname,'Hello JavaScript !',(err)=>{
//      if(err){
//           console.log("Something went wrong while writing file");
//           return;
//      }

//      console.log("File has been appended asynchronously")
//   })
  console.log("File Operation Done !")
}

// createFile("./hello.txt");


// portion -> 4
import * as fs from "node:fs/promises"
async function createFile2(pathname) {
     try{
          await fs.writeFile(pathname,"Hello Nodejs! \n");
          await fs.appendFile(pathname,"Hello JavaScript! \n");
     }catch(err){
          console.log("Error -> ", err)
     }
     console.log("File Written");
}

// createFile2("Hello.txt")

const listItems = async () => {
  try {
    const items = await fs.readdir(process.cwd(), { withFileTypes: true });

    console.log(chalk.blue("\n📁 Current Directory Items:\n"));

    items.forEach(item => {
      if (item.isDirectory()) {
        console.log(chalk.yellow("📂 " + item.name));
      } else {
        console.log(chalk.white("📄 " + item.name));
      }
    });
  } catch (error) {
    console.log(chalk.red("❌ Error listing items:"), error.message);
  }
};
listItems();