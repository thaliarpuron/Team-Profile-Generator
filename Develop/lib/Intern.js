// Code to define and export the Intern class. This class inherits from Employee.

const Employee = require("./Employee")

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.title = "Intern";
        this.school = school;
    }

    getSchool(){
        return this.school
    }
}

module.exports = Intern;