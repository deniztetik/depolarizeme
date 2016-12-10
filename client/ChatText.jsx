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
        messageHeights:this.getMessageHeights()
      })
    }


    var $infinite = document.getElementsByClassName('infinite-scroll')[0];
    if (this.props.messages.length !== prevProps.messages.length) {
      $infinite.scrollTop = $infinite.scrollHeight;
    }

  }

  getMessageHeights() {
    var $messages = Array.prototype.slice.call(document.getElementsByClassName('message-item'))
    return $messages.map((message) => {
      return message.clientHeight;
    }).slice(0, $messages.length / 2).push(56);
  }

  guesstimateMessageHeights(messageList) {
    var $test = document.getElementById("Test");
    var width = ($test.clientWidth + 1);
    var $infinite = $('.infinite-scroll')[0];

    var charWidth = width / 52;
    var charHeight = 24;
    var infiniteWidth = $infinite ? $infinite.clientWidth : 332;

    var charsPerLine = Math.round(infiniteWidth / charWidth);

    return messageList.map((message) => {
      var numRows = message.body.length / charsPerLine
      return numRows * charHeight;
    })
  }

  render() {
    var hs = this.guesstimateMessageHeights(this.props.messages).push(24);
    if (this.props.messages.length > 0) {

    }
    return (
      <Infinite
        className="infinite-scroll"
        containerHeight={200}
        elementHeight={this.guesstimateMessageHeights(this.props.messages)}
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
