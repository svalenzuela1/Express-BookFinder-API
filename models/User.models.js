const { Schema, model } = require('mongoose')

const UserModels = new Schema({
    username: {type: String, required: true, unique: true, maxlength: 30, minLength: 3},
    password: {type: String, required: true, maxlength: 50, minLength: 3}
}, {timestamps: true})

const User = model('user', UserModels)

module.exports = User

