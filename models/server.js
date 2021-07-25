const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            inicio: '/'
        }

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use( this.paths.inicio, require('../routes/inicio') );
    }

    sockets() {
        this.io.on("connection", ( socket ) => socketController( socket, this.io ) );
    }

    listen() {

        this.server.listen( this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;