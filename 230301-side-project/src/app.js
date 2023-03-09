import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import routeIndex from "../routes/index"
import routeUser from '../routes/users'
import routeAuth from '../routes/auth'
import routeProduct from '../routes/product'
import routeSelect from '../routes/select'
import routeItems from '../routes/items'
import models from "../models/index"

require('dotenv').config()

models.sequelize.sync().then(() => {
    console.log('DB 연결 성공')
}).catch(err => {
    console.log('DB 연결 실패')
})

const app = express()

app.set('port', process.env.PORT || 3000)

//debugger
app.use(express.json())
app.use(cookieParser())

app.use(session({
    key: 'sid',
    secret: 'secret-message',
    cookie: {
        maxAge: 24000 * 60 * 60
    }
}))

app.use('/', routeIndex)
app.use('/users', routeUser)
app.use('/auths', routeAuth)
app.use('/products', routeProduct)
app.use('/items', routeItems)
app.use('/selects', routeSelect)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중...')
})