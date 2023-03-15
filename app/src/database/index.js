const path = require("path");
const fs = require("fs");

module.exports = {
    /* readJSON: (json) => {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, json)))
    },
    writeJson: (json, array) => {
        fs.writeFileSync(path.resolve(__dirname, json), JSON.stringify(array,null,3), 'utf-8')
    }, */

    users:JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    writeUsersJson: (data) => {
        fs.writeFileSync(path.join(__dirname, "../database/users.json"), JSON.stringify(data), "utf-8")
    }
}