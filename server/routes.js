var mongoose = require("mongoose");

var url = "mongodb://ianculleton:depolarizeme16@ds153637.mlab.com:53637/depolarizeme"
// var url = "mongodb://localhost/test"

var Message = require("../db/messages.js")
var User = require("../db/users.js")

mongoose.connect(url)

module.exports = function(app) {

  app.get('/chats/:user', (req, res) => {
    var currentUser = req.url.split('/').pop()
    Message.find({users: currentUser}, (err, messages) => {
      if (err) {
        console.log(err);
        res.status(400)
        res.send("Internal database error.")
      } else {
        res.send(messages);
      }
    })
  })

  app.get('/users/:user', (req, res) => {
    var params = req.url.split('/');
    var user = params.pop();
    User.findOne({username: user}, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500);
        res.send("Database lookup failed.")
      }
      if (user) res.send(user);
      else {
        res.status(200);
        res.send({})
      }
    })

  })

  app.get('/users/:party/:user', (req, res) => {
    var params = req.url.split('/');
    var user = params.pop();
    var party = params.pop();
    console.log('hit user query endpoint.', user, party)
    var otherParty = party === 'democrat' ? 'republican' : 'democrat';
    //find current user in db.
    User.findOne({username: user}, (err, user) => {
      if (err) {
        console.error("error retrieving current user.", err);
        res.status(500);
        res.send("Internal database error.")}
      else {
        // query current user for connections.
        if (user && user.connectedTo !== null) {
          console.log("found active connections: ", user.connectedTo)
          //if found, respond with connected user.
          res.status(200)
          res.send(user.connectedTo);
        } else if(user) {  // user must not be connected already.
          console.log('found no connections for current user.  Querying database.')
          //pull from active users from other party.
          User.find({party: otherParty}, (err, userConnections) => {
            if (err) {
              console.error("Error retrieving potential connection pool", err)
              res.status(400);
              res.send(err)
            } else {
              //pull the first found user without a connection.
              var remoteUser = userConnections.pop();
              while (remoteUser && remoteUser.connectedTo !== null) {
                remoteUser = userConnections.pop();
              }
              if (remoteUser === undefined) {
                res.status(200)
                res.send("no active users found.")
              } else {
                // update remote user with connection data.
                User.update({username: remoteUser.username}, {connectedTo: user.username}, {multi: false}, (err, numAffected) => {
                  if(err) {'error updating remote user docs: ', console.error(err)}
                })
                // update local user with connection data.
                User.update({username: user.username}, {connectedTo: remoteUser.username}, {multi: false}, (err, numAffected) => {
                  if(err) {'error updating local user docs: ', console.error(err)}
                })
                // send remote user in response.
                res.status(200);
                res.send(remoteUser.username);
              }
            }
          })
        } else {
          console.error("server error!");
          res.status(500);
          res.send("miscommunication between server and database.")
        }

      }
    })
    // res.send('you hit the /users/... endpoint!  Good job.')
  })

  app.post('/chats', (req, res) => {
    var currentMessage = new Message(req.body);
    currentMessage.save((err) => {
      if (err) {
        console.log(err);
        res.status(400)
        res.send("Internal database error.")
      } else {
        res.status(202)
        res.send(currentMessage)
      }
    })
  })

  app.post('/users', (req, res) => {
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
  })

  app.delete('/users/:user', (req, res) => {
    var currentUser = req.url.split('/').pop();
    //remove user from db.
    //disconnect remote user.
    User.findOneAndRemove({username: currentUser}, (err, foundUser) => {
      if (err) console.error(err);
      if (foundUser) {
        User.update({connectedTo: foundUser.username}, {connectedTo: null}, {multi: false}, (err, numAffected) => {
          if (err) {
            res.status(500)
            res.send("error updating remote user docs.")
          } else {
            res.status(203);
            res.send(currentUser+" was removed from database.")
          }
        })
      }
    })
    console.log("you did a delet on: ", currentUser);
  })

}
