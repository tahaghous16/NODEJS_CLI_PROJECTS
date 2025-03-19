import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todoList = [];

const showMenu = () => {
  console.log("\n 1: Add Task in a list");
  console.log(" 2: View Your Tasks");
  console.log(" 3: Exit");
  rl.question("\nShow An Option: ", handleInput);
};

const handleInput = (option) => {
  switch (option) {
    case "1":

      rl.question("Enter Task: ", (task) => {
        todoList.push(task);
        console.log("Task Added: ", task);
        showMenu();
      });
      break;

    case "2":

      if (todoList.length === 0) {
        console.log("\nList is Empty");
      } else {
        console.log("\n\nYour Todo List:");
        todoList.forEach((tasks, idx) => {
          console.log(`${idx + 1}.${tasks}`);
        });
      }
      showMenu();
      break;

    case "3":

      console.log("\nGood bye!");
      rl.close();
      break;

    default:
      console.log("\nEnter Valid Options");
      showMenu();
      break;
  }
};

showMenu();
