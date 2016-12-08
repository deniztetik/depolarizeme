import React from 'react';
import MessageItem from './MessageItem.jsx';

var ShadowChat = (props) => (
  <div className="shadow-chat">
    <div>
      <img src="/assets/DepMe_Small.png" />
    </div>
    {
      props.messages.map((message, idx) => {
        if (message.author === props.localUser) {
          return <MessageItem
            party={props.party}
            message={message}
            key={idx}
         />
        } else if (message.author) {
          return <MessageItem
            party={props.party !== "democrat" ? "democrat" : "republican"}
            message={message}
            key={idx}
         />
        } else {
          return <div className="chat-text-message-announcement" key={idx}>{message.body}</div>
        }
      })
    }
  </div>
)

export default ShadowChat
