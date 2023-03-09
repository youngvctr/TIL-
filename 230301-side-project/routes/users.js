import express from 'express'
import crypto from 'crypto'
import models from '../models'

const router = express.Router()

router.get('/signup', (req, res, next) => {
    return res.status(200).json({ "status code": 200 })
})

router.post('/signup', async (req, res, next) => {
    debugger
    let body = await req
    console.log(body.query.name)

    debugger
    let salt = Math.round((new Date().valueOf() * Math.random())) + ""
    let hashPassword = crypto.createHash('sha256').update(body.query.password + salt).digest('hex')

    let result = await models.user.create({
        name: body.query.name,
        email: body.query.email,
        password: hashPassword,
        salt: salt
    })

    debugger
    //console.log(result)
    res.set('Content-Type', 'text/plain')
    return res.status(200).json([{ "result": result }, { "status code": 200 }])
    //return res.status(200).json({ message: `${name}, Hello! ` })
})



module.exports = router