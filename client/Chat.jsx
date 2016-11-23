import React from 'react'
import ChatText from './ChatText.jsx'
import ChatInput from './ChatInput.jsx'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      userInterval: null,
      messagesInterval: null
    }
  }

  componentDidMount() {
    this.getMessages();
    this.checkUser();
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault()
      this.exitChat().bind(this)
      return e.returnValue = ""
    })
  }

  checkUser() {
    var userCheckIntervalId = setInterval(() => {
      $.get("/users/"+this.props.params.remoteUser, (data, err) => {
        if (err !== "success") console.error(err)
        if (!data.username) {
          this.setState({messages: this.state.messages.reverse().concat([{body: "Your conversation partner has disconnected..."}]).reverse()})
          clearInterval(this.state.userInterval);
          clearInterval(this.state.messagesInterval);
        }
      })
    }, 10000);
    this.setState({userInterval: userCheckIntervalId})
  }

  getMessages() {
    var getMessageIntervalId = setInterval(() => {
      $.get("/chats/"+this.props.params.localUser, (data, err) => {
        if (err !== "success") {
          console.error(err)
        }
        if (data) {
          this.setState({messages: data})
        }
      })
    }, 3000)
    this.setState({messagesInterval: getMessageIntervalId})
  }

  postMessage(messageBody) {
    var message = {
      users: [this.props.params.localUser, this.props.params.remoteUser],
      author: this.props.params.localUser,
      body: messageBody
    }
    $.post({
      url: "/chats",
      data: JSON.stringify(message),
      contentType: "application/json"
    }).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.error(err)
    })
  }

  handleNewMessageSubmit(e) {
    e.preventDefault();
    var $text = e.target.childNodes[0]
    var messageText = $text.value;
    this.postMessage(messageText)
    // this.setState({messages: this.state.messages.concat([messageText])})
    $text.value = ''
  }

  exitChat(e) {
    if (e) {e.preventDefault();}
    $.ajax({
      method: "DELETE",
      url: "/users/"+this.props.params.localUser
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div className="chat-container">
        <ChatInput
          handleSubmit={this.handleNewMessageSubmit.bind(this)}
          destroySession={this.exitChat.bind(this)}/>
        <ChatText
          localUser={this.props.params.localUser}
          party={this.props.params.party}
          messages={this.state.messages}/>
      </div>
    )
  }
}


export default Chat
