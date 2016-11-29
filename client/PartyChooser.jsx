import React from 'react'
import { Link } from 'react-router'
import SharingButtons from './SharingButtons.jsx'

class PartyChooser extends React.Component {
  constructor(props) {
    super(props)
  }

  generateUsername() {
    //eventually this should be replaced with oAuth or something more secure but for now this will do.
    var username = '';
    for (var i = 0; i < 20; i++) {
      username += String.fromCharCode(Math.floor(97+(Math.random()*26)))
    }
    return username
  }

  enterWaitingRoom(username, party) {
    this.props.onConnect(username, this.props.remoteUser, this.props.party)
    var userData = {
      username: username,
      party: party
    }
    $.post({
      url: "/users",
      data: JSON.stringify(userData),
      contentType: "application/json"
    }).then((data) => {
    }).catch((err) => {
      console.error(err)
    })
  }

  getActiveUsers(party) {
    console.log("current user in getActiveUsers", this.props.localUser)
    // var otherParty = this.props.params.party === "democrat" ? "republican" : "democrat"
    var intID = setInterval(() => {
      if (this.props.remoteUser !== null) {
        this.setState({resolved: true});
        this.props.onConnect(this.props.localUser, this.props.remoteUser, this.props.party);
        clearInterval(intID)
        return 1;
      }
      $.get("/users/"+party+"/"+ this.props.localUser, (data, err) => {
        if (err) {
          console.log(err)
        }
        if (data && data !== "no active users found.") {
          this.props.onConnect(this.props.localUser, data, party)
        }
      })
    }, 3000)
  }

  handlePartySelection(choice) {
    //if button is disabled, return error;
    if (this.props.buttonIsDisabled) {return 1; }
    //if button is enabled, disable and generate session.
    this.props.toggleButton();
    var userName = this.generateUsername();
    console.log("username in HandlePartySelection: ", userName)
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
                  <button className={(this.props.buttonIsDisabled ? " disabled" : "") + " myButton-left"} onClick={this.handlePartySelection.bind(this, "democrat")}>
                    <span>Democrat</span>
                  </button>
                </div>
            </div>
            <span className="choosecommand-text">Choose your party</span>
            <div className="elephant">
                <img className="image-elephant" src="assets/elephant-silhouette-black-small.jpg"></img>
                <div className="button-right">
                  <button className={(this.props.buttonIsDisabled ? " disabled" : "") + " myButton-right"} onClick={this.handlePartySelection.bind(this, "republican")}>
                    <span>Republican</span>
                  </button>
                </div>
            </div>
          </div>
          <SharingButtons />
        </div>
      </div>
    )
  }
}

export default PartyChooser
