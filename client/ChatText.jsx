import React from 'react'

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
      <div className="chat-text-container" style={ {height: "200px"} }>
       <div>Chat space</div>
       {
        this.state.messages.map((message, idx) => {
          if (message.author === this.props.localUser) {
            return <div
              className={this.props.party === "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican"}
              key={idx}><span>{message.author+": "}</span>{message.body}</div>
          } else if (message.author) {
            return <div className={this.props.party !== "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican"}
              key={idx}><span>{message.author+": "}</span>{message.body}</div>
          } else {
            return <div className="chat-text-message-announcement" key={idx}>{message.body}</div>
          }
        })
      }
      </div>
    )
  }

}


export default ChatText
