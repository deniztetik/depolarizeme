import React from 'react'
import { Link } from 'react-router'

var ChatInput = ({handleSubmit, destroySession}) => (
  <div className="chat-input-container">
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input className="chat-input-textarea" type="text"></input>
      <input className="chat-input-submit" type="submit" value="Send"></input>
    </form>
    <button className="chat-input-destroy" onClick={destroySession}><Link to={"/"}>Chat with another partner</Link></button>
  </div>
)

export default ChatInput
