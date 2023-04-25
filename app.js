import inquirer from "inquirer";
import login from "./login.js";
import signup from "./signup.js";

function getChoice() {
    return inquirer.prompt([
        {
            type: "list",
            name: "feature",
            message: "Please select from the following:",
            choices: [
                { name: "Login", value: "login" },
                { name: "Signup", value: "signup" },
                { name: "Post", value: "post" },
                { name: "Like", value: "like" },
                { name: "Comment", value: "comment" },
                { name: "Show news feed", value: "newsfeed" }
            ],
        },
    ]);
};

async function runApp() {
    let feature = (await getChoice()).feature;
    if(feature === 'login') {
        await login()
    } else if (feature === 'signup') {
        await signup()
    } else {
        console.log('FEATURE NOT AVAILABLE YET')
    };
    runApp();
};

runApp();