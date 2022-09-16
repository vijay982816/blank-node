
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,

    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;


