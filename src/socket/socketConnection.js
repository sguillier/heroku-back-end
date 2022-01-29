


/* --------------------- DATABASE --------------------------- */

// Mensajes
import claseMensajes from '../daos/claseMensajes.js'
const mensajes = new claseMensajes()
// await mensajes.deleteAllMessages()
// import normalizeChat from './normalizeChat.js';
// import denormalizeChat from './denormalizeChat.js';


// Productos
import claseProductos from '../daos/claseProductos.js'
const productos = new claseProductos()
// await productos.deleteAllProducts()


// Usuarios
import claseUsuarios from '../daos/claseUsuarios.js'
const usuarios = new claseUsuarios()
// await usuarios.deleteAllUsers()





/* --------------------- SOCKET CONNECTION --------------------------- */

import { createServer } from 'http';
import { Server } from 'socket.io';


export default async function socketConnection(app, sessionMiddleware, logger) {

    // Iniciamos el servidor http a partir de la aplicación express
    const httpServer = createServer(app);
    const io = new Server(httpServer, { cors: { origin: '*' } });


    // Rutilizamos el middleware de session para que se pueda usar en socket.io
    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    })


    io.on('connection', async (socket) => {
        logger.info(`[Socket conectado] socket.id: ${socket.id}`)

        // Productos
        socket.emit('productos', await productos.getAllProducts());
        socket.on('update-productos', async (e) => {
            try {
                await productos.saveProduct(e)
                io.sockets.emit('productos', await productos.getAllProducts());
            } catch (err) {
                logger.error(err)
            }
        })


        // Chat
        socket.emit('chat', await mensajes.getAllMessages());
        socket.on('update-chat', async (mensaje) => {
            try {

                // Verificamos que usuario este logueado y tomamos sus datos
                // Solo los usuarios logueados pueden enviar mensajes
                if (socket.request.session.passport) {
                    const userId = socket.request.session.passport.user;
                    const user = await usuarios.getUserById(userId)

                    // Eliminamos la claveValor password (por seguridad, para que no se valla al front)
                    delete user.password
                    const mensajeConUsuario = { ...mensaje, user }

                    // Guardamos Mensaje y Republicamos Mensajes
                    await mensajes.saveMessage(mensajeConUsuario)
                    const arrayMensajes = await mensajes.getAllMessages()
                    io.sockets.emit('chat', arrayMensajes);

                    // const chatNormalized = await normalizeChat(arrayMensajes)
                    // io.sockets.emit('chat', chatNormalized );
                } else {
                    console.log("Para enviar mensajes el usuario debe estar logueado")
                }
            } catch (err) {
                logger.error(err)
            }
        })
    });


    return httpServer
}



