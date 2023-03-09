import express from 'express'
import crypto from 'crypto'
import models from '../models'
const router = express.Router()


router.post("/login", async (req, res) => {
    let body = req.query

    // debugger
    // console.log(req)
    let result = await models.user.findOne({
        where: {
            email: body.email
        }
    })

    //console.log(result)
    //debugger
    let dbPassword = result.dataValues.password
    let inputPassword = body.password
    let salt = result.dataValues.salt
    let hashPassword = crypto.createHash("sha256").update(inputPassword + salt).digest("hex")

    if (dbPassword === hashPassword) {
        // 쿠키 설정
        res.cookie("user", body.userEmail, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        })
        return res.status(200).json({ status: "200", msg: "비밀번호 일치" })
    }
    else {
        return res.status(200).json({ msg: "비밀번호 불일치" })
    }
})


router.get('/login', async (req, res) => {
    return res.status(200).json({ msg: "로그인 페이지" })
})

module.exports = router