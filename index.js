const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
async function main(){
    console.log(`starting`);
    const userResponse = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your Homework Tittle?",
            name: "homeworkTittle"
        },
        {
            type: "input",
            message: "Provide detail description",
            name: "homeworkDescription"
        },
        {
            type: "input",
            message: "What are the steps required to install your homework? Provide a step-by-step description of how to get the development environment running.",
            name: "installationProcess"
        },
        {
            type: "input",
            message: "Provide instructions for use.",
            name: "instruction"
        },
        {
            type: "input",
            message: "Provide instructions examples for use.",
            name: "instructionExample"
        },

        {
            type: "input",
            message: "Provide examples on how to run tests.",
            name: "tests"
        },
       console.log(`starting`);
        console.log(userResponse);
        const gitUsername = userResponse.username;
        const projectTittle = userResponse.homeworkTittle;
        const projectDescription = userResponse.homeworkDescription;
        const installationProcess = userResponse.installationProcess;
        const instruction = userResponse.instruction;
        const instructionExample = userResponse.instructionExample;
        const tests = userResponse.tests;
            // fetching data from git
            // user
        const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
        const gitData = gitResponse.data;
        const gitName = gitData.login;
        const gitEmail = gitData.email;
        const gitlocation = gitData.location;
        const gitUrl = gitData.html_url;
        const gitProfileImage = gitData.avatar_url;
    var result = (
# ${homeworkTittle}
${homeworkDescription}
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [Author](#Author)
\n* [Tests](#Tests)
## Installation
${installationProcess}
## Instructions
${instruction}
\`\`\`
${instructionExample}
\`\`\`
## Tests
${tests}
## Author
\n![ProfileImage](${gitProfileImage})
\n**${gitName}**
\nEmail: ${gitEmail}
\nLocation:${gitlocation}
\nGitHub: ${gitUrl}
var writeResult = fs.writeFileSync(path.join(__dirname, '../GoodReadMeGenerator', 'readMe.md'), result )
console.log("file generated....")
    }
main();
