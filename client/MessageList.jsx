import React from 'react'

class MessageList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
     <div className="scroll-area-inner-container">
       <div>Chat space</div>
       {
         this.props.messages.map((message, idx) => {
           if (message.author === this.props.localUser) {
             return <div
               className={this.props.party === "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican"}
               key={idx}><span style={{ fontWeight: "bold" }} >{message.author}</span><span> : </span>{message.body}</div>
           } else if (message.author) {
             return <div className={this.props.party !== "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican"}
               key={idx}><span style={{ fontWeight: "bold" }}>{message.author}</span><span> : </span>{message.body}</div>
           } else {
             return <div className="chat-text-message-announcement" key={idx}>{message.body}</div>
           }
         })
       }
     </div>
    )
  }
}
export default MessageList;
