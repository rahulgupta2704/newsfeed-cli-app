import dbRead from './dbread.js';
import inquirer from "inquirer";

async function login() {
  let usersTable = dbRead().users;

  const creadentials = await inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Please enter your username",
    },
    {
      type: "input",
      name: "password",
      message: "Please enter your password",
    }
  ]);

  let user = usersTable.find((row) => row.username === creadentials.username);

  if (!user) {
    console.log('Incorrect username or passwrod!');
  } else if (user.password === creadentials.password) {
    process.env.userSession = user.user_id;
    console.log('Logged in successfully!')
  } else {
    console.log('Incorrect username or passwrod!');
  };
}

export default login;