import {register} from '../controllers/user'

const express = require('express')
// const { register, activateAccount, login } = require('../controllers/user')
const userRouter = express.Router()

userRouter.post('/register', register)
// userRouter.post('/register', (req,res) => {
//     console.log("hello world")
// })

// router.post('/activate',activateAccount)

// router.post('/login', login)


module.exports = userRouter