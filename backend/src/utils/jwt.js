import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

export function create_JWT(user, expires) {
    const token = jwt.sign(user, process.env.SECRET_JWT_KEY, {expiresIn: `${expires}`})
    return token
}