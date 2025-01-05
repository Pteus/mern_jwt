const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);
        
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const registerUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.register(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

module.exports = {loginUser, registerUser}