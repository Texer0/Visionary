import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { create_JWT } from '../utils/jwt.js'
import { select_query } from '../utils/dataBase_administrator.js'

dotenv.config({ path: '../.env' })
const DEBUG = parseInt(process.env.DEBUG)
const COOCKIE_MAXAGE = parseInt(process.env.COOCKIE_MAXAGE) * 3600

const route_login = express.Router()

route_login.post('/', async (req, res) => {

    const { email, password } = req.body
    
    if (!email || !password) {
        return res.send({data: 'Missing information', status: 400})
    }

    let query_email = await select_query('user', '*', `email = '${email}'`)
    if (!query_email[0]) {return res.send({data: 'User Not found', status: 404})}

    var stored_password = await select_query('user', 'password', `email = '${email}'`)

    try {

        let isValid = await bcrypt.compare(password, stored_password[0].password)
        if (!isValid) {return res.send({status: 401, data: 'Invalid password'})}

    } catch (err){
        if (DEBUG) {console.log(err)}
        return res.send({status: 404})
    }

    let result = await select_query('user', '*',  `email = '${email}'`)
    result = result[0]
    
    const user = {
        name: result.name,
        email: email
    }

    const token = create_JWT(user, '1h')

    res.cookie('Visionary_access_token', token, {
        httpOnly: true,
        secure: !DEBUG,
        maxAge: COOCKIE_MAXAGE,
        sameSite: 'strict'
    })

    res.cookie('Visionary_user_data', JSON.stringify(user), {
        httpOnly: false,
        secure: !DEBUG,
        maxAge: COOCKIE_MAXAGE,
        sameSite: 'lax'
    })
    
    res.send({status: 201})
})

export default route_login