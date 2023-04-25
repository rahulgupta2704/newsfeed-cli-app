import dbRead from './dbread.js';
import dbWrite from './dbwrite.js';
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";

async function post() {
  if (!process.env.userSession) {
    console.log('\nPlease login first!\n');
    return;
  }

  let db = dbRead();
  let postsTable = db.posts;

  const post = await inquirer.prompt([
    {
      type: "input",
      name: "content",
      message: "Enter post content:",
    }
  ]);
  
  post.user_id = process.env.userSession;
  post.timestamp = Date.now();
  post.post_id = uuidv4();

  postsTable.push(post);

  dbWrite(db);

  console.log('\nPost posted successfully!\n');
};

export default post;