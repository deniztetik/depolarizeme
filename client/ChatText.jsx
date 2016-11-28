import React from 'react'
import Infinite from 'react-infinite'
import MessageItem from './MessageItem.jsx'

class ChatText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages,
      messageHeights: [],
      localMessageClass:this.props.party === "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican",
      localUsernameClass: this.props.party === "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican",
      remoteMessageClass: this.props.party !== "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican",
      remoteUsernameClass: this.props.party !== "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican"

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length > prevState.messages.length) {
      this.setState({
        messages: prevProps.messages,
        messageHeights: this.getMessageHeights()
      })
      console.log(this.getMessageHeights())
      this.forceUpdate();
    }
  }

  getMessageHeights() {
    var $messages = Array.prototype.slice.call(document.getElementsByClassName('message-item'))
    return $messages.map((message) => {
      return message.clientHeight;
    })
  }

  render() {
    return (
      <Infinite
        containerHeight={200}
        elementHeight={30}
        displayBottomUpwards={true}
      >
       {
         this.props.messages.map((message, idx) => {
           if (message.author === this.props.localUser) {
             return <MessageItem
               party={this.props.party}
               message={message}
               key={idx}
            />
           } else if (message.author) {
             return <MessageItem
               party={this.props.party !== "democrat" ? "democrat" : "republican"}
               message={message}
               key={idx}
            />
           } else {
             return <div className="chat-text-message-announcement" key={idx}>{message.body}</div>
           }
         })
       }
      </Infinite>
    )
  }
}


export default ChatText
