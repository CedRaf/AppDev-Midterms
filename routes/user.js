const express = require('express'); 
const userController = require("../controllers/userController"); 
const authMiddleware = require('../middleware/authMiddleware'); 

const userRouter = express.Router();
userRouter.post('/register', userController.registerNewUser); 
userRouter.post('/login', userController.loginAccount); 
userRouter.get('/', authMiddleware, userController.getAllUsers);

module.exports = userRouter; 