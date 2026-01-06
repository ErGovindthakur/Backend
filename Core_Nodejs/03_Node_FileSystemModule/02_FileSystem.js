// Writing a production level fs module code
import fs from "node:fs/promises"

// 1. creating a folder using "fs.mkdir()"
async function createFolder(foldername){
     try {
          await fs.mkdir(foldername,{recursive:true});
     } catch (error) {
          console.log("Error -> ",error)
     }
}

// 2. creating a file with "fs.writeFile()"
async function createFile(pathname,content=""){
     await fs.writeFile(pathname,content);
}

// 3. add new content in file
async function writeToFile(pathname,content=""){
     await fs.appendFile(pathname,content)
}

// 4. read file
async function readFile(pathname){
     const data = await fs.readFile(pathname,'utf-8')
     console.log(data)
}

// 5. delete file
async function deleteFile(filePath){
     await fs.unlink(filePath);
}


// 6. delete folder
async function deleteFolder(folderPath){
     await fs.rm(folderPath,{recursive:true})
}


// 7. get file info

async function getFileInfo(filePath){
     const stats = await fs.stat(filePath)
     return{
          size:`${(stats.size/1024).toFixed(2)}KB`,
          createAt:stats.birthtime.toLocaleString(),
          modifiedAt:stats.mtime.toLocaleString()
     }
     // console.log(stats)
}
// createFolder("./contents/images/logos")
// createFile("./Hello.txt","Hello JavaScript\n")
// readFile('./Hello.txt')
// deleteFile('./Hello.txt')
// deleteFolder("./contents")
let fileInfo = getFileInfo("./Hello.txt");
fileInfo.then((data)=>{console.log(data)})
.catch(err=>console.log(err))

