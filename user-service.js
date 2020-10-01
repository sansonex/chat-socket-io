
const prompt = require('prompt-sync')();

function setUser() {
    let username = prompt('What is your name?');
    let groupId = prompt('What is your group Id?');

    let user = { name: username, groupId };

    return user;
}


module.exports = { setUser }