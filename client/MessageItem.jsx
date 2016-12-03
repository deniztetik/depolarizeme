import React from 'react'

var MessageItem = (props) => (
  <div
    className={props.party === "democrat" ? "chat-text-message-democrat "+"message-item" : "chat-text-message-republican "+"message-item"}>
      <span className={props.party === "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican"} >{props.party === "democrat" ? "Democrat:  " : "Republican:  "}</span> <span className="message-body">{props.message.body}</span>
    </div>
)

export default MessageItem;
