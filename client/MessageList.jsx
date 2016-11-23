import React from 'react'

class MessageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localMessageClass:this.props.party === "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican",
      localUsernameClass: this.props.party === "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican",
      remoteMessageClass: this.props.party !== "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican",
      remoteUsernameClass: this.props.party !== "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican"
    }
  }

  scrollToBottom() {
    this.context.scrollArea.scrollBottom();
    console.log("ScrollToBottom called!", this.context.scrollArea.scrollBottom)
  }

  componentDidUpdate(oldProps, oldState) {
    this.scrollToBottom.bind(this);
  }

  render() {
    return (
     <div className="scroll-area-inner-container">
       {
         this.props.messages.map((message, idx) => {
           if (message.author === this.props.localUser) {
             return <div
               className={this.state.localMessageClass}
               key={idx}><span className={this.state.localUsernameClass} style={{ fontWeight: "bold" }} >{(this.props.party === "democrat" ? "Democrat: " :"Republican: ")}</span>{message.body}</div>
           } else if (message.author) {
             return <div className={this.state.remoteMessageClass}
               key={idx}><span className={this.state.remoteUsernameClass} style={{ fontWeight: "bold" }}>{(this.props.party === "democrat" ? "Republican: " : "Democrat: ")}</span>{message.body}</div>
           } else {
             return <div className="chat-text-message-announcement" key={idx}>{message.body}</div>
           }
         })
       }
     </div>
    )
  }
}

MessageList.contextTypes = {
    scrollArea: React.PropTypes.object
};

export default MessageList;
