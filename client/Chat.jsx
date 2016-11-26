import React from 'react'
import ChatText from './ChatText.jsx'
import ChatInput from './ChatInput.jsx'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localUser:  this.props.localUser,
      remoteUser: this.props.remoteUser,
      resolved: false,
      messages: [],
      userInterval: null,
      messagesInterval: null
    }
  }

  componentDidMount() {
    console.log('componentDidMount called!')
    if (this.props.localUser !== null && this.props.remoteUser !== null && !this.state.resolved) {
      this.getMessages();
      this.checkUser();
      this.setState({resolved: true});
    }
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault()
      this.props.exitChat().bind(this)
      return e.returnValue = ""
    })
    this.props.scrollBottom()
  }

  checkUser() {
    var userCheckIntervalId = setInterval(() => {
      $.get("/users/"+this.state.remoteUser, (data, err) => {
        if (err !== "success") console.error(err)
        if (!data.username) {
          this.setState({messages: this.state.messages.reverse().concat([{body: "Your conversation partner has disconnected..."}])})
          clearInterval(this.state.userInterval);
          clearInterval(this.state.messagesInterval);
        }
      })
    }, 10000);
    this.setState({userInterval: userCheckIntervalId})
  }

  getMessages() {
    var getMessageIntervalId = setInterval(() => {
      $.get("/chats/"+this.state.localUser, (data, err) => {
        if (err !== "success") {
          console.error(err)
        }
        if (data) {
          this.setState({messages: data})
          console.log("response from server: ", data)
        }
      })
    }, 3000)
    this.setState({messagesInterval: getMessageIntervalId})
  }

  postMessage(messageBody) {
    var message = {
      users: [this.state.localUser, this.state.remoteUser],
      author: this.state.localUser,
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
    this.setState({messages: this.state.messages.concat([{
      body: messageText,
      author: this.state.localUser,
      seen: false,
      users: [this.state.localUser, this.state.remoteUser]
    }])})
    $text.value = ''
  }

  render() {
    return (
      <div className="chat-container">
        <ChatText
          localUser={this.state.localUser}
          party={this.props.party}
          messages={this.state.messages}/>
        <ChatInput
          handleSubmit={this.handleNewMessageSubmit.bind(this)}
          destroySession={this.props.exitChat.bind(this)}/>
      </div>
    )
  }
}


export default Chat
