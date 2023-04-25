import dbRead from './dbread.js';
import dbWrite from './dbwrite.js';
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";

async function like() {
  if (!process.env.userSession) {
    console.log('\nPlease login first!\n');
    return;
  };

  const like = await inquirer.prompt([
    {
      type: "input",
      name: "post_id",
      message: "Please enter the post id you want to like:",
    }
  ]);

  like.user_id = process.env.userSession;
  like.timestamp = Date.now();
  like.like_id = uuidv4();

  let db = dbRead();
  let likesTable = db.likes;

  if (!(db.posts.some((row) => row.post_id === like.post_id))) {
    console.log('\nPost with the entered id does not exist!\n');
    return;
  } else if (likesTable.some((row) => (row.post_id === like.post_id) && (row.user_id === like.user_id))) {
    console.log('\nYou have already liked the post!\n');
  } else {
    likesTable.push(like);

    dbWrite(db);

    console.log('\nPost liked successfully!\n');
  }
};

export default like;