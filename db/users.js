var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userID: { type: Schema.ObjectId, ref: 'User' },
    username: String,
    active: {type: Boolean, default: true},
    party: String,
    date: { type: Date, default: Date.now },
    connectedTo: {type: String, default: null}
  });

var User = mongoose.model("User", userSchema)

module.exports = User
