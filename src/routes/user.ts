import { authUser } from '../middlewares/auth'
import { register, login, activateAccount, auth} from '../controllers/user'

const express = require('express')
// const { register, activateAccount, login } = require('../controllers/user')
const userRouter = express.Router()

userRouter.post('/register', register)

userRouter.post('/activate',activateAccount)

userRouter.post('/login', login)

userRouter.post('/auth',authUser, auth)


module.exports = userRouter