import { Router } from 'express'


const routerAuth = (passport) => {

    const app = Router();

    app.post('/register',
        passport.authenticate('register', {
            failureRedirect: '/failregister',
            successRedirect: '/home/',
        })
    )


    app.post('/login',
        passport.authenticate('login', {
            failureRedirect: '/faillogin',
            successRedirect: '/home/',
        })
    )


    app.get('/isauth', (req, res) => {
        if (req.isAuthenticated()) {
            res.send(req.user)
        } else {
            res.send('false')
        }
    })


    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    return app
}

export default routerAuth;
