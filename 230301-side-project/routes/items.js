import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
    return res.status(200).json({ msg: "아이템 페이지" })
})

module.exports = router