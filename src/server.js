const express = require('express');
const app = express();
const config = require('./config/config.json');
const dotenv = require('dotenv');

require('./database/connection');

// obtengo la config del .env
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

const messagesRouter = require('./routes/messages');
app.use('/api', messagesRouter);

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = config.PORT;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
