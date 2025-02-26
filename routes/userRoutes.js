const express = require('express');
const auth = require('../middleware/authorization');
const { createUser, login, verifyToken } = require('../controllers/userController');


const userRouter = express.Router();

userRouter.post('/register', createUser); 
userRouter.post('/login', login);
userRouter.get('/verifytoken', auth, verifyToken); 


module.exports = userRouter;