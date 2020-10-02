const chalk = require('chalk')
const repl = require('repl')
const socket = require('socket.io-client');
const { setUser } = require('./user-service.js');

var io = null;

start();

function start() {
    const user = setUser()
    io = socket('http://localhost:3000', { query: `groupId=${user.groupId}&userName=${user.name}` });

    startClient(user);
}

function startClient(user) {
    io.on('connect', () => {
        console.log(chalk.red(`------------SALA ${user.groupId}-------------------`))
    });

    io.on('message', (data) => {
        const { message, user } = data
        console.log(chalk.green(`${user.name} digitou: ${message}`))
    });

    io.on('joined_user', (data) => {
        console.log(chalk.blue(`${data}`))
    });

    repl.start({
        prompt: '',
        eval: (message) => {
            io.send({
                message,
                user
            })
        }
    })
};

