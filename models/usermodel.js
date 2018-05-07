const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    facebookId: String
},{
    collection: 'users'
  }); // stores data in users

const User = mongoose.model('user', userSchema);

module.exports = User;