var User = require("../db/User.js")

export default {
  createUser: function(req, res) {
    console.log(req.body);
    var currentUser = new User(req.body);
    currentUser.save((err) => {
      if (err) {
        console.log(err);
        res.status(400)
        res.send("Internal database error.")
      } else {
        res.status(202)
        res.send(currentUser)
      }
    })
  }
}
