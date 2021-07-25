const { Socket } = require('socket.io');

const socketController = (socket = new Socket(), io) => {

    socket.on('stream', (image) => {
        // Emitir evento a todos los sockets conectados
        socket.broadcast.emit('stream', image);
    });
}

module.exports = {
    socketController
}