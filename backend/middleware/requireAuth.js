const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {

    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'No token provided'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(_id).select('_id')
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: 'Request is not authorized'});
    }

    next()
}

module.exports = requireAuth;