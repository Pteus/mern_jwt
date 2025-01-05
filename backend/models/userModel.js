const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require("validator");

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

// static register method
UserSchema.statics.register = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required');
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email address');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({email});
    if (exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.create({email, password: hashedPassword});
}

// static login method
UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({email});
    if (!user) {
        throw Error('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Invalid credentials');
    }

    return user;
}
module.exports = mongoose.model('User', UserSchema);