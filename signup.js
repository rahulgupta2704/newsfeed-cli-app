import dbRead from './dbread.js';
import dbWrite from './dbwrite.js';
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";

async function signup() {
  let db = dbRead();
  let usersTable = db.users;

  const newUserDetails = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter your first name",
    },
    {
      type: "input",
      name: "last_name",
      message: "Please enter your last name",
    },
    {
      type: "input",
      name: "username",
      message: "Please enter the username",
    },
    {
      type: "input",
      name: "password",
      message: "Please enter the password",
    }
  ]);

  newUserDetails.user_id = uuidv4();

  if (usersTable.some((row) => row.username === newUserDetails.username)) {
    console.log('USERNAME ALREADY EXISTS');
    return;
  }

  usersTable.push(newUserDetails);

  dbWrite(db);
};

export default signup;