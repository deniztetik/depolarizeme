import React from 'react'
import { Link } from 'react-router'
import TranscriptButton from './TranscriptButton.jsx'

var ChatInput = ({handleSubmit, destroySession}) => (
  <div className="chat-input-container">
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input className="chat-input-textarea" type="text"></input>
      <input className="chat-input-submit" type="submit" value="Send"></input>
    </form>
    <div style={{display: "flex", padding: "10px", justifyContent: "space-between"}}>
      <button className="chat-input-destroy" onClick={(e) => { destroySession(e, false)}}>Chat with another partner</button>
      <TranscriptButton />
    </div>
  </div>
)

export default ChatInput
