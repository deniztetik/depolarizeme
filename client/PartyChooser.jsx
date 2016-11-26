import React from 'react'
import { Link } from 'react-router'

class PartyChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      party: null,
      localUser: null,
      remoteUser: null
    }
  }

  generateUsername() {
    //eventually this should be replaced with oAuth or something more secure but for now this will do.
    var username = '';
    for (var i = 0; i < 20; i++) {
      username += String.fromCharCode(Math.floor(97+(Math.random()*26)))
    }
    return username
  }

  componentDidMount() {
    var usr = this.generateUsername()
    this.setState({localUser: usr});
  }

  enterWaitingRoom(username, party) {
    var userData = {
      username: username,
      party: party
    }
    $.post({
      url: "/users",
      data: JSON.stringify(userData),
      contentType: "application/json"
    }).then((data) => {
      console.log("User has been saved in database: ", data)
    }).catch((err) => {
      console.error(err)
    })
  }

  getActiveUsers(party) {
    // var otherParty = this.props.params.party === "democrat" ? "republican" : "democrat"
    var intID = setInterval(() => {
      if (this.state.remoteUser !== null) {
        this.setState({resolved: true});
        this.props.onConnect(this.state.localUser, this.state.remoteUser, this.state.party);
        clearInterval(intID)
        return 1;
      }
      $.get("/users/"+party+"/"+ this.state.localUser, (data, err) => {
        if (err) {
          console.log(err)
        }
        if (data && data !== "no active users found.") {
          this.setState({remoteUser: data})
          console.log("List of possible user connections: ", data)
        }
      })  
    }, 3000)
  }

  handlePartySelection(choice) {
    var userName = this.generateUsername();
    this.setState({
      localUser: userName,
      party: choice
    });
    this.enterWaitingRoom(userName, choice);
    this.getActiveUsers(choice);
  }

  render() {
    return (
      <div data-reactroot="">
        <div className="jumbotron">
          <div className="container">
            <div>
              <h1><span className="dep">Dep</span><span className="olarize">olarize</span> <span className="me">Me</span></h1>
            </div>
            <div>
    					<p>The USA is polarized. Most of the people we know share our views. Want to chat with the other side?</p>
    				</div>
          </div>
          <div className="image-container">
            <div className="donkey">
                <img className="image-donkey" src="assets/donkey-silhouette-black-small.jpg"></img>
                <div className="button-left">
                  <button className="myButton-left" onClick={this.handlePartySelection.bind(this, "democrat")}>
                    <span>Democrat</span>
                  </button>
                </div>
            </div>
            <span className="choosecommand-text">Choose your party</span>
            <div className="elephant">
                <img className="image-elephant" src="assets/elephant-silhouette-black-small.png"></img>
                <div className="button-right">
                  <button className="myButton-right" onClick={this.handlePartySelection.bind(this, "republican")}>
                    <span>Republican</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PartyChooser
