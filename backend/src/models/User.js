const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email : String
});

module.exports = model('User', UserSchema);