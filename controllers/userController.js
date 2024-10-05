const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken'); 
const Joi = require('joi'); 
const bcrypt = require('bcrypt'); 

const registerSchema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(), 
    password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(), 
});

const registerNewUser = async (req, res) =>{

    const {error} = registerSchema.validate(req.body); 
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    const {username, email, password} = req.body; 

    const existingUser = await User.getEmail(email);

    if(!existingUser){
        return res.status(400).json({message: "An account with this email already exists!"});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = {
        username, 
        email,
        hashedPassword,
    }

    const createdUser = await User.createUser(newUser); 
    if(createdUser){
        res.status(200).json({message: "New user successfully created!"}); 
    }

    return res.status(500).json({ message: "User creation failed!" });
}

const loginAccount = async (req, res) =>{

    const {error} = loginSchema.validate(req.body); 
    if(error){
        return res.status(400).json({message: error.details[0].message}); 
    }

    const {email, password} = req.body;

    const existingUser = await User.getEmail(email); 
    if(!existingUser){
        return res.status(400).json({message: "Invalid Email"}); 
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password); 
    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid Password"}); 
    }

    const token = jwt.sign({id: existingUser.id, email:existingUser.email}, 'CS3105APPDEV', {expiresIn: '1h'}); 

    res.status(200).json({
        message: "Login Successful",
        token: token, // include the token
        user: {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email
        }
    });
}

const getAllUsers= (req, res) =>{
    const users = User.getAllUsers();

    res.json(users); 
}

module.exports = {
    registerNewUser,
    loginAccount,
    getAllUsers
}; 