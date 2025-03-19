import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let FileCreation = () => {
  rl.question("Enter Your File Name: ", (fileName) => {
    rl.question("Write Content in a File: ", (content) => {
      const res = fs.writeFile(fileName, content, (err) => {
        if (err) throw err;
        else {
          console.log(`${fileName} File created successfully`);
        }
      });
      rl.close();
    });
  });
};

FileCreation();
