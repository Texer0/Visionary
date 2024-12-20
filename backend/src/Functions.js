import validator from 'validator'
import color from 'colors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { select_query } from './DataBase Administrator.js'

dotenv.config()

export async function validate_register(name, email) {

    var user = await select_query('user', 'id', `email = '${email}'`)
    if (user[0]) return 'The Email already exists'
    
    user = await select_query('user', 'id', `name = '${name}'`)

    if (user[0]) return 'The Name already exists'
    
    return true
}


export function create_JWT(user, expires) {
    const token = jwt.sign(user, process.env.SECRET_JWT_KEY, {expiresIn: `${expires}`})
    return token
}
