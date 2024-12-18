import express from 'express'
import { authenticator } from 'otplib'
import { v4, validate } from "uuid"
import color from 'colors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import QRCode from 'qrcode'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import { select_query, delete_query, insert_into_query, update_query } from './src/DataBase Administrator.js'
import { create_JWT, validate_register } from './src/Functions.js'


dotenv.config({ path: '../.env' })

const app = express()
const PORT = parseInt(process.env.PORT)
const HOST = process.env.HOST


import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname, 'src', 'views'))

app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'src', 'views'))
app.use(express.static('public'))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.session.user = data
        // console.log("DATA " + JSON.stringify(data))
    } catch (err) {
        // console.log("No token found")
    }
    next()
})

app.use((req, res, next) => {

    if ((req.path === '/login') || (req.path === '/register')) {return next()}
    else if (req.path === '/2fa') {next()}
    
    if (req.session && req.session.user) {return next()}
    
    return res.redirect('/login')
})


app.get('/', (req, res) => {
    return res.redirect('/home')
})


app.get('/login', async (req, res) => {
    return res.render('login')
})


app.post('/login', async (req, res) => {

    const { email, password } = req.body
    let query_email = await select_query('user', '*', `email = '${email}'`)
    if (!query_email[0]) {return res.send('User Not found').status(404)}

    var stored_password = await select_query('user', 'password', `email = '${email}'`)

    try {

        var isValid = await bcrypt.compare(password, stored_password[0].password)
        if (!isValid) {return res.status(401).send('Invalid password')}

    } catch {
        return res.status(404)
    }

    let result = await select_query('user', '*',  `email = '${email}'`)
    result = result[0]

    const user = {
        name: result.name,
        email: result.email,
        level_permissions: result.level_permissions
    }

    const token = create_JWT(user, '1h')
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    })
    res.status(200)
    res.redirect('/home')
})



app.get('/register', (req, res) => {
    return res.render('register')
})

app.post('/register', async (req, res) => {
    const { name, email, password, repeat_password } = req.body

    if (password !== repeat_password) {
        res.status(400).send('Passwords do not match')
        return
    }

    var IsValid = await validate_register(name, email, password)

    if (IsValid === true) {
        console.log("Generando usuario".bgYellow)
        let hashedPassword = await bcrypt.hash(password, (parseInt(process.env.DEBUG) ? 1 : 10))
        
        await insert_into_query('user', 'name, email, password, hash', `'${name}', '${email}', '${hashedPassword}', '${v4()}'`)
        res.status(201)
        return res.redirect('/home')
    } else {
        console.log('Error:', IsValid)
        return res.status(400).send(`${IsValid}`)
        // Añadir una notificación más estética
    }   
})

app.get('/home', (req, res) => {
    let username = req.session.user.name
    res.render('home', {username})
})


app.get('/admin', (req, res) => {
    const user = req.session.user

    if (!user) {return res.redirect('/login').status(404).send('User not found')}

    if (user.level_permissions != 10) {
        return res.redirect('/home').status(403).send("Not authorized")
    }

    res.render('admin')
})


app.get('/logout', (req, res) => {
    res.clearCookie('access_token')
})


app.get('/2fa', async (req, res) => {
    const user = req.session.user
    if (!user) {return res.redirect('/login').status(404).send('User not found')}

    const secret = authenticator.generateSecret()

    const otpauth = authenticator.keyuri(user.email, 'TaskDev', secret)
    
    QRCode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
            console.error('Error al generar el QR:', err)
            return
        }
        return res.send(`<img src= "${imageUrl}"></img>`)
    })

    var user_hash = await select_query('user', 'hash', `email = '${user.email}'`)
    await insert_into_query('auth', 'secret, user_hash', `'${secret}', '${user_hash[0].hash}'`)
})

app.get('/2fa_auth', async (req, res) => {
    res.render('2fa_google')
})


app.post('/2fa', async (req, res) => {
    const { user_token } = req.body

    if (user_token.length != 6) {return res.send('Invalid code')}
    const user_hash = req.session.user.hash
    const secret = await select_query('auth','secret', `user_hash = '${user_hash}'`)
    console.log(user_token)
    console.log(secret[0].secret)
    const isValid = authenticator.verify({token: user_token, secret: secret[0].secret})
    
    if (!isValid){return res.send('Error code')}
    res.status(200).redirect('/home')

})

app.get('/projects', async (req, res) => {
    const user = req.session.user
    
    const result = await select_query('user_has_project', 'project_id', `user_hash = '${user.hash}'`)

    if (!result[0]) {return res.render('boton_crear_proyecto')}
    
    var projects = []
    
    for (const project of result) {
        const stored_project = await select_query('project', '*', `id = '${project.project_id}'`)
        projects.push(stored_project[0])
    }
    res.render('projects',  { projects } )
})


app.delete('/projects', async (req, res) => {
    const user = req.session.user
    const { project_id } = req.body

    await delete_query('user_has_project', `user_hash = '${user.hash}' and project_id = ${project_id}`)
    await delete_query('project', `id = ${project_id}`)
    
    res.status(201)
    res.redirect('/home')
})


app.patch('/projects', async (req, res) => {
    // Modify proyects
    const user = req.session.user
    const { project_id, columns, new_data } = req.body

    console.log("project_id: " + project_id) // wich modify
    console.log("columns: " + columns)       // what to modify
    console.log("new_data: " + new_data)     // what to put intead

    // await update_query('project', `${columns}`, `${new_data}`, `id = ${project_id}`)

    // return res.redirect('/project/:id').status(201)

})


app.get('/new_project', async (req, res) => {
    res.render('new_project')
})

app.post('/new_project', async (req, res) => {
    const { name, description, link } = req.body
    try {
        await insert_into_query('project', 'title, description, link', `'${name}', '${description}', '${link}'`)
    
        let project_id = await select_query('project', 'id', `title = '${name}'`)
        
        await insert_into_query('user_has_project', 'project_id, user_hash', ` ${project_id[0].id}, '${req.session.user.hash}'`)
        res.status(201).redirect('/projects')
    } catch {
        console.error('Error al insertar proyecto')
        return res.status(500).send('Error al insertar proyecto')
    }

})

app.get('/project/:id', async (req, res) => {
    const { id } = req.params
    const user = req.session.user

    const result = await select_query('user_has_project', 'project_id', `user_hash = '${user.hash}'`)

    for (const project_id of result) {
        if (project_id.project_id === parseInt(id)) {
            return res.json(await select_query('project', '*', `id = ${id}`))
        }
    }

    return res.status(404).send('Project not found')
    // lists
    // tasks of list
})


app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})