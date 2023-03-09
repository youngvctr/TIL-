import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
    return res.status(200).json({ msg: '메인 페이지' })
})

module.exports = router