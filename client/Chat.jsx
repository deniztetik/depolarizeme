import React from 'react'
import ChatText from './ChatText.jsx'
import ChatInput from './ChatInput.jsx'
import ShadowChat from './ShadowChat.jsx'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resolved: false,
      messages: [],
      userInterval: null,
      messagesInterval: null
    }
  }

  componentDidMount() {
    if (this.props.localUser && this.props.remoteUser && !this.state.resolved) {
      this.getMessages();
      this.checkUser();
      this.setState({resolved: true});
    }
    this.props.scrollBottom()
  }

  componentWillUnmount() {
    this.setState({
      resolved: false,
      messages: [],
    })
    clearInterval(this.state.userInterval);
    clearInterval(this.state.messagesInterval);
  }

  checkUser() {
    var userCheckIntervalId = setInterval(() => {
      $.get("/users/"+this.props.remoteUser, (data, err) => {
        if (!data.username) {
          this.setState({messages: this.state.messages.concat([{body: "Your conversation partner has disconnected.  Please return to the main menu to chat with another user."}])})
          clearInterval(this.state.userInterval);
          clearInterval(this.state.messagesInterval);
          this.props.exitChat(true, true);
        }
      })
    }, 10000);
    this.setState({userInterval: userCheckIntervalId})
  }

  getMessages() {
    var getMessageIntervalId = setInterval(() => {
      $.get("/chats/"+this.props.localUser, (data, err) => {
        if (err !== "success") {
          console.error(err)
        }
        if (data) {
          console.log(data)
          this.setState({messages: data})
        }
      })
    }, 3000)
    this.setState({messagesInterval: getMessageIntervalId})
  }

  postMessage(messageBody) {
    var message = {
      users: [this.props.localUser, this.props.remoteUser],
      author: this.props.localUser,
      body: messageBody
    }
    $.post({
      url: "/chats",
      data: JSON.stringify(message),
      contentType: "application/json"
    }).then((data) => {
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
      author: this.props.localUser,
      seen: false,
      users: [this.props.localUser, this.props.remoteUser]
    }])})
    $text.value = ''
  }

  render() {
    return (
      <div className="chat-container">
        <ChatText
          localUser={this.props.localUser}
          party={this.props.party}
          messages={this.state.messages}/>
        <ChatInput
          handleSubmit={this.handleNewMessageSubmit.bind(this)}
          destroySession={this.props.exitChat}/>
        <div id="shadow-chat-hider" className="hidden">
          <ShadowChat
            party={this.props.party}
            localUser={this.props.localUser}
            remoteUser={this.props.remoteUser}
            messages={this.state.messages}
          />
        </div>
      </div>
    )
  }
}


export default Chat
