
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Infinite from 'react-infinite'
import Chat from './Chat.jsx'
import PartyChooser from './PartyChooser.jsx'

// Fron

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      party: null,
      localUser: null,
      remoteUser: null
    }
  }

  setUsers(newLocalUser, newRemoteUser, newParty) {
    this.setState({
      localUser: newLocalUser,
      remoteUser: newRemoteUser,
      party: newParty
    })
  }
  
  exitChat(e) {
    if (e) {e.preventDefault();}
    $.ajax({
      method: "DELETE",
      url: "/users/"+this.state.localUser
    }).then((data) => {
      console.log(data);
      this.setState({
        party: null,
        localUser: null,
        remoteUser: null
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  scrollBottom() {
    $("body").animate({scrollTop: $(document).height()-$(window).height()})
  }

  render() { 
    return (
      <div className="app-container">
        <PartyChooser
          onConnect={this.setUsers.bind(this)}
        />
        { this.state.party && this.state.localUser && this.state.remoteUser ? 
        <Chat 
          party={this.state.party}
          localUser={this.state.localUser}
          remoteUser={this.state.remoteUser}
          scrollBottom={this.scrollBottom}
          exitChat={this.exitChat.bind(this)}
        /> : 
        <div></div>
        }
        <div className="footer">Some footer text here.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
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
