
import express from "express";
import session from "express-session";

const sessionMiddleware = session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })


/* --------------------- PASSPORT --------------------------- */

import passport from "./passport/passportLocal.js";



/* --------------------- SERVER --------------------------- */

const app = express()



/* --------------------- MIDDLEWARE --------------------------- */

app.use( sessionMiddleware )


app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))



/* --------------------- ROUTERS --------------------------- */

import routerAuth from './routers/auth.js'
app.use('/api/auth', routerAuth(passport))


import routerRandoms from './routers/randoms.js'
app.use('/api/randoms', routerRandoms)


import routerInfo from './routers/info.js'
app.use('/info', routerInfo)


app.get('/*', (req, res) => {
  res.json({ mensaje:'Ruta inexistente' })
})


/* --------------------- SOCKET --------------------------- */

import socketConnection from "./socket/socketConnection.js";
const httpServer = await socketConnection(app, sessionMiddleware);




/* --------- LISTEN ---------- */

const PORT = 80
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))


