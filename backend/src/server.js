import express from 'express'
import { authenticator } from 'otplib'
import { v4, validate } from "uuid"
import color from 'colors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import QRCode from 'qrcode'
import dotenv from 'dotenv'
import cors from 'cors'

import route_login from './routes/login.js'
import route_register from './routes/register.js'
import route_bd_request from './routes/bd_request.js'
import route_cookies from './routes/cookies.js'

dotenv.config({ path: '../.env' })

const app = express()
const DEBUG = process.env.DEBUG
const PORT = parseInt(process.env.PORT)
const HOST = process.env.HOST

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: `http://${HOST}:4001`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))



app.use('/login', route_login)

app.use('/register', route_register)

app.use('/bd_request', route_bd_request)

app.use('/cookies', route_cookies)



// app.get('/admin', (req, res) => {
//     const user = req.session.user

//     if (!user) {return res.redirect('/login').status(404).send('User not found')}

//     if (user.level_permissions != 10) {
//         return res.redirect('/home').status(403).send("Not authorized")
//     }

//     res.render('admin')
// })


// app.get('/logout', (req, res) => {
//     res.clearCookie('access_token')
// })


// app.get('/2fa', async (req, res) => {
//     const user = req.session.user
//     if (!user) {return res.redirect('/login').status(404).send('User not found')}

//     const secret = authenticator.generateSecret()

//     const otpauth = authenticator.keyuri(user.email, 'TaskDev', secret)
    
//     QRCode.toDataURL(otpauth, (err, imageUrl) => {
//         if (err) {
//             console.error('Error al generar el QR:', err)
//             return
//         }
//         return res.send(`<img src= "${imageUrl}"></img>`)
//     })

//     var user_hash = await select_query('user', 'hash', `email = '${user.email}'`)
//     await insert_into_query('auth', 'secret, user_hash', `'${secret}', '${user_hash[0].hash}'`)
// })


// app.get('/2fa_auth', async (req, res) => {
//     res.render('2fa_google')
// })


// app.post('/2fa', async (req, res) => {
//     const { user_token } = req.body

//     if (user_token.length != 6) {return res.send('Invalid code')}
//     const user_hash = req.session.user.hash
//     const secret = await select_query('auth','secret', `user_hash = '${user_hash}'`)
//     console.log(user_token)
//     console.log(secret[0].secret)
//     const isValid = authenticator.verify({token: user_token, secret: secret[0].secret})
    
//     if (!isValid){return res.send('Error code')}
//     res.status(200).redirect('/home')

// })






// app.get('/project/:id', async (req, res) => {
//     const { id } = req.params
//     const user = req.session.user

//     const result = await select_query('user_has_project', 'project_id', `user_hash = '${user.hash}'`)

//     for (const project_id of result) {
//         if (project_id.project_id === parseInt(id)) {
//             return res.json(await select_query('project', '*', `id = ${id}`))
//         }
//     }

//     return res.status(404).send('Project not found')
//     // lists
//     // tasks of list
// })


app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})