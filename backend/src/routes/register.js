import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { v4 } from "uuid"

import { create_JWT } from '../utils/jwt.js'
import { validate_register } from '../utils/validate_register.js'
import { insert_into_query } from '../utils/dataBase_administrator.js'

dotenv.config({ path: '../.env' })

const DEBUG = parseInt(process.env.DEBUG)
const COOCKIE_MAXAGE = parseInt(process.env.COOCKIE_MAXAGE)

const route_register = express.Router()

route_register.post('/', async (req, res) => {
    const { name, email, password } = req.body

    if (!email || !password || !name) {
        return res.send({ data: 'Missing information', status: 400 })
    }
    
    var IsValid = await validate_register(name, email)

    if (typeof IsValid === 'string') {
        return res.send({ data: `${IsValid}`, status: 400 })
    }
    console.log("Generating user".bgYellow)
    let hashedPassword = await bcrypt.hash(password, (DEBUG ? 1 : 10))
    
    try {
        await insert_into_query('user', 'name, email, password, hash', `'${name}', '${email}', '${hashedPassword}', '${v4()}'`)
        
    } catch (err) {
        if (DEBUG) {console.error(err)}
        
        return res.send({data: 'A problem has ocurred with registration', status: 400})
    }    

        const user = {
            name: name,
            email: email,
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

        return res.send({status: 201})

})


export default route_register