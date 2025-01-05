const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
UserSchema.statics.register = async function (email, password) {
    const exists = await this.findOne({email});
    if (exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.create({email, password: hashedPassword});
}

module.exports = mongoose.model('User', UserSchema);