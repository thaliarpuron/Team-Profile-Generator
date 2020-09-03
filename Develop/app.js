const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembersArray = [];

async function prompt() {
    let responseCompleted = "";
    do {
        firstResponse = await inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's name?",
                name: "name"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ],
                name: "role",
            },
            {
                type: "input",
                message: "Enter the employee's ID:",
                name: "id"
            },
            {
                type: "input",
                message: "What is the employee's email address?",
                name: "email"
            },
        ]);

        let secondResponse = "";

        if (firstResponse.role === "Manager") {
            secondResponse = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's office number?",
                    name: "officeNumber"
                },
            ]);
            const manager = new Manager(firstResponse.name, firstResponse.id, firstResponse.email, secondResponse.officeNumber);
            teamMembersArray.push(manager);
        } if (firstResponse.role === "Engineer") {
            secondResponse = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's github username?",
                    name: "github"
                },
            ]);
            const engineer = new Engineer(firstResponse.name, firstResponse.id, firstResponse.email, secondResponse.github);
            teamMembersArray.push(engineer);
        } if (firstResponse.role === "Intern") {
            secondResponse = await inquirer.prompt([
                {
                    type: "input",
                    message: "What school is the employee attending?",
                    name: "school"
                },
            ]);
            const intern = new Intern(firstResponse.name, firstResponse.id, firstResponse.email, secondResponse.school);
            teamMembersArray.push(intern);
        }

        responseCompleted = await inquirer.prompt([
            {
                type: "list",
                message: "Would you like to add another team member? ",
                choices: [
                    "Yes",
                    "No"
                ],
                name: "finish",
            },
        ]);

    } while (responseCompleted.finish === "Yes");
}

async function generateHTML() {
    await prompt()
    try {
        const html = render(teamMembersArray);
        fs.writeFileSync(outputPath, html);
    } catch (error) {
        console.log(error);
    }
}

generateHTML();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
