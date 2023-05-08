const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        title: String,
        first: String,
        last: String
    },
    gender: String,
    location: {
        city: String,
        state: String,
        country: String
    },
    dob: {
        date: String,
        age: Number
    },
    phone: String,
    cell: String,
    picture: {
        large: String,
        medium: String,
        thumbnail: String
    },
    nat: String
});

UserSchema.methods.isValidPassword = async function(encryptedPassword) {
    const user = this;
    const compare = await bcrypt.compare(encryptedPassword, user.password);
    return compare;
}

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;