import React from 'react'
import Infinite from 'react-infinite'
import MessageItem from './MessageItem.jsx'

class ChatText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages,
      localMessageClass:this.props.party === "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican",
      localUsernameClass: this.props.party === "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican",
      remoteMessageClass: this.props.party !== "democrat" ? "chat-text-message-democrat" : "chat-text-message-republican",
      remoteUsernameClass: this.props.party !== "democrat" ? "chat-text-message-username-democrat" : "chat-text-message-username-republican"

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
<<<<<<< HEAD
        elementHeight={40}
        containerHeight={250}
        infiniteLoadBeginEdgeOffset={0}
        displayBottomUpwards={true}
      >
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
=======
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
>>>>>>> 8c2fc39a85351a9525deba52d6e43b586a6c3448
      </Infinite>
    )
  }

  // render() {
  //   return (
  //     <ScrollArea
  //       speed={0.8}
  //       className="area"
  //       contentClassName="content"
  //       horizontal={false}
  //       style={{ height: 200 }}
  //       >
  //       <MessageList
  //         messages={this.state.messages}
  //         party={this.props.party}
  //         localUser={this.props.localUser}
  //       />
  //     </ScrollArea>
  //   )
  // }

}


export default ChatText
