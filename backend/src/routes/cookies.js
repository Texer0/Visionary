import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: '../.env'})
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
const DEBUG = process.env.DEBUG

const route_cookies = express.Router()


route_cookies.get('/', async (req, res) => {
    if (req.cookies?.Visionary_access_token) {
        res.json({ exists: true })
    } else {
      res.json({ exists: false })
    }
})


route_cookies.post('/', async (req, res) => {

    const token = req.cookies?.Visionary_access_token
    const user = { ...req.body }

    if (!token) {
        return res.send({ message: 'No token provided', status: 204 })
    }

    if (DEBUG) {
        console.log("Token: ", token)
        console.log("User: ", user)
    }

    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
        if (err) {
            return res.send({ isValid: false, status: 401 })
        }
        res.send({ isValid: true, status: 200})
    })
})

export default route_cookies