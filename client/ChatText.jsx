import React from 'react'
import Infinite from 'react-infinite'
import MessageItem from './MessageItem.jsx'

class ChatText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length > prevState.messages.length) {
      this.setState({messages: prevProps.messages})
      this.forceUpdate();
    }
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
