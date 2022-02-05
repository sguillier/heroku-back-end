


//
// Aqui indicamos que tipo de persistencia usamos (hay que descomentar solo uno)
// const persistencia = 'txt'
// const persistencia = 'mongoose'
// const persistencia = 'mongodb'
const persistencia = 'firebase'
// const persistencia = 'memoria'



//
// Configuracion de persistencia en File System
const txtConfig = {
    fileName: {
        productos: 'productos.txt',
        carritos: 'carritos.txt',
        usuarios: 'usuarios.txt',
        mensajes: 'mensajes.txt',
    }
}


//
// Configuracion de persistencia con Mongoose
const mongooseConfig = {
    esquema: {
        productos: {
            id: { type: Number, required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            url: { type: String, required: false },
        },
        carritos: {
            id: { type: Number, required: true },
            userId: { type: Number, required: false },
            productos: { type: Array, required: true },
            creado: { type: String, required: true },
            modificado: { type: String, required: true },
            total: { type: Number, required: true },
        },
        usuarios: {
            id: { type: Number, required: true },
            nombre: { type: String, required: true },
            apellido: { type: String, required: true },
            email: { type: String, required: true },
            rol: { type: String, required: true },
        },
        mensajes: {
            id: { type: Number, required: true },
            mail: { type: String, required: true },
            hora: { type: String, required: true },
            msg: { type: String, required: true },
        },
    },
}


export { persistencia, txtConfig, mongooseConfig }
