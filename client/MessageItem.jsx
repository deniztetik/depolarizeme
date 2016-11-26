import React from 'react'

var MessageItem = (props) => (
  <div
    className={props.party === "democrat" ? "chat-text-message-democrat "+"message-item" : "chat-text-message-republican "+"message-item"}>
      <span style={{ fontWeight: "bold" }} >{props.party === "democrat" ? "Democrat: " : "Republican: "}</span>
      {props.message.body}
    </div>
)

export default MessageItem;