const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
AdminSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password') || this.isNew) {
            const hashedPassword = await argon2.hash(this.password);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});


const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
