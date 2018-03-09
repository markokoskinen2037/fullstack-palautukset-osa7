const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    of_age: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
    return {
        id: user.id,
        username: user.username,
        of_age: user.of_age,
        name: user.name,
        blogs: user.blogs
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User