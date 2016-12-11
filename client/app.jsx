
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Infinite from 'react-infinite'
import Chat from './Chat.jsx'
import PartyChooser from './PartyChooser.jsx'
import Footer from './Footer.jsx'

// Fron

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonIsDisabled: false,
      party: null,
      localUser: null,
      remoteUser: null
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault()
      this.exitChat.call(this)
      // e.returnValue = "beforeunload fired."
    })
  }

  setUsers(newLocalUser, newRemoteUser, newParty) {
    this.setState({
      localUser: newLocalUser,
      remoteUser: newRemoteUser,
      party: newParty
    })
    this.forceUpdate();
  }

  exitChat(e) {
    if (e) {e.preventDefault();}
    $.ajax({
      method: "DELETE",
      url: "/users/"+this.state.localUser
    }).then((data) => {
      this.setUsers(null, null, null)
      this.toggleButton();
    }).catch((err) => {
      console.error(err);
    })
  }

  scrollBottom() {
    $("body").animate({scrollTop: $(document).height()-$(window).height()})
  }

  toggleButton() {
    this.setState({buttonIsDisabled: !this.state.buttonIsDisabled})
  }

  render() {
    return (
      <div className="app-container">
        <PartyChooser
          party={this.state.party}
          localUser={this.state.localUser}
          remoteUser={this.state.remoteUser}
          onConnect={this.setUsers.bind(this)}
          toggleButton={this.toggleButton.bind(this)}
          buttonIsDisabled={this.state.buttonIsDisabled}
        />
        { this.state.party !== null && this.state.localUser !== null && this.state.remoteUser !== null ?
        <Chat
          party={this.state.party}
          localUser={this.state.localUser}
          remoteUser={this.state.remoteUser}
          scrollBottom={this.scrollBottom}
          exitChat={this.exitChat.bind(this)}
        /> :
        <div style={{
          display: "flex",
          justifyContent: "center",
          height: "200px"
        }}>
          {this.state.buttonIsDisabled ? <img className="chat-spinner" src="assets/spinner.gif"></img> : <div></div>}
        </div>
        }
        <Footer />
      </div>
    )
  }

}


//var App = () => (
//  <div>
//    <Router history={browserHistory}>
//      <Route path="/" component={PartyChooser}></Route>
//      <Route path="/chat/:party/:localUser/:remoteUser" component={Chat}></Route>
//      <Route path="/waiting/:party/:localUser" component={WaitingRoom}></Route>
//    </Router>
//  </div>
//)

render(<App />, document.getElementById('app'));
