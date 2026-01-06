// 📂 File System Manager (CLI Tool)

import fs from "node:fs/promises";
import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import chalk from "chalk";


const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

// =======================
// Utility Functions
// =======================

const createFolder = async (folderName) => {
  try {
    await fs.mkdir(folderName, { recursive: true });
    console.log(chalk.green("✅ Folder created successfully"));
  } catch (error) {
    console.log(chalk.red("❌ Error creating folder:"), error.message);
  }
};

const createFile = async (fileName, content = "") => {
  try {
    await fs.writeFile(fileName, content);
    console.log(chalk.green("✅ File created successfully"));
  } catch (error) {
    console.log(chalk.red("❌ Error creating file:"), error.message);
  }
};

const writeContent = async (fileName, content = "") => {
  try {
    await fs.appendFile(fileName, content);
    console.log(chalk.green("✅ Content written successfully"));
  } catch (error) {
    console.log(chalk.red("❌ Error writing content:"), error.message);
  }
};

const deleteFile = async (fileName) => {
  try {
    await fs.unlink(fileName);
    console.log(chalk.green("🗑 File deleted successfully"));
  } catch (error) {
    console.log(chalk.red("❌ Error deleting file:"), error.message);
  }
};

const deleteFolder = async (folderName) => {
  try {
    await fs.rm(folderName, { recursive: true, force: true });
    console.log(chalk.green("🗑 Folder deleted successfully"));
  } catch (error) {
    console.log(chalk.red("❌ Error deleting folder:"), error.message);
  }
};

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

// =======================
// Menu
// =======================

console.log(chalk.blue.bold("\n📂 File System Manager\n"));

const options = [
  "Create Folder",
  "Create File",
  "Write to File",
  "Delete File",
  "Delete Folder",
  "List Items",
  "Exit"
];

const showMenu = () => {
  options.forEach((opt, i) => {
    console.log(chalk.yellow(`${i + 1}.`) + chalk.white(` ${opt}`));
  });
};

async function menu() {
  showMenu();

  const answer = await rl.question(chalk.cyan("\nEnter your option: "));

  switch (answer) {
    case "1": {
      const folderName = await rl.question(chalk.yellow("Folder name: "));
      await createFolder(folderName);
      break;
    }

    case "2": {
      const fileName = await rl.question(chalk.yellow("File name: "));
      const content = await rl.question(chalk.green("Write content: "));
      await createFile(fileName, `${content}\n`);
      break;
    }

    case "3": {
      const fileName = await rl.question(chalk.yellow("File name: "));
      const content = await rl.question(chalk.green("Write content: "));
      await writeContent(fileName, `${content}\n`);
      break;
    }

    case "4": {
      const fileName = await rl.question(chalk.red("File name to delete: "));
      await deleteFile(fileName);
      break;
    }

    case "5": {
      const folderName = await rl.question(chalk.red("Folder name to delete: "));
      await deleteFolder(folderName);
      break;
    }

    case "6": {
      await listItems();
      break;
    }

    case "7": {
      console.log(chalk.magenta("\n👋 Program exited."));
      rl.close();
      return;
    }

    default:
      console.log(chalk.red("❌ Invalid option"));
  }

  console.log(); // spacing
  menu();
}

menu();
