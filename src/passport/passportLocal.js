
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'

import bCrypt from 'bcrypt'


/* ------------------ DATABASE -------------------- */

import claseUsuarios from './../daos/claseUsuarios.js'
const usuarios = new claseUsuarios()


/* ------------------ PASSPORT -------------------- */

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {

      try {
        const user = await usuarios.getUserById(username)
        if (user) {
          console.log('User already exists')
          return done(null, false)
        }
      } catch (err) {
        console.log('Error in SignUp: ' + err)
        return done(err)
      }

      const newUser = {
        password: createHash(password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        avatar: req.body.avatar,
      }


      try {
        await usuarios.saveUserById(username, newUser)
        const userWithId = { id:username, ...newUser }
        console.log('User Registration succesful')
        console.log(userWithId)
        return done(null, userWithId)
      } catch (err) {
        console.log('Error in Saving user: ' + err)
        return done(err)
      }

    }
  )
)

passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await usuarios.getUserById(username)

      if (!user) {
        console.log('User Not Found with username ' + username)
        return done(null, false)
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password')
        return done(null, false)
      }

      return done(null, user)


    } catch (err) {
      console.log('Error in Login: ' + err)
      return done(err)
    }

  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  const usuario = await usuarios.getUserById(id)
  done(null, usuario)
})


function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password)
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

export default passport
