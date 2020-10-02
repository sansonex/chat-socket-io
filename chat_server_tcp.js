const http = require('http').createServer();
const io = require('socket.io')(http)

http.listen(3000, () => { console.log('Server Started!') });

io.on('connection', (socket) => {
    var groupId = socket.handshake.query['groupId'];
    var userName = socket.handshake.query['userName'];
    socket.join(groupId);

    socket.to(groupId).emit('joined_user', `O usuário: ${userName} acabou de entrar!`);
    // socket.to(groupId).emit('message', `Bem-Vindo @${userName}`)

    socket.on('message', (evt) => {
        socket.to(groupId).emit('message', evt)
    })

    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id);
    })
})