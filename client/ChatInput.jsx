import React from 'react'
import { Link } from 'react-router'

var ChatInput = ({handleSubmit, destroySession}) => (
  <div className="chat-input-container">
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input className="chat-input-textarea" type="text"></input>
      <input className="chat-input-submit" type="submit" value="Send"></input>
    </form>
    <Link to={"/"}><button className="chat-input-destroy" onClick={destroySession}>Chat with another partner</button></Link>
  </div>
)

export default ChatInput
