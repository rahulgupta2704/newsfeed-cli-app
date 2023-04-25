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
    console.log('\nIncorrect username or passwrod!\n');
  } else if (user.password === creadentials.password) {
    process.env.userSession = user.user_id;
    console.log('\nLogged in successfully!\n')
  } else {
    console.log('\nIncorrect username or passwrod!\n');
  };
}

export default login;