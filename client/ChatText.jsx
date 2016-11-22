import React from 'react'
import ScrollArea from 'react-scrollbar'
import MessageList from './MessageList.jsx'

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
      <ScrollArea
        speed={0.8}
        className="area"
        contentClassName="content"
        horizontal={false}
        style={{ height: 200 }}
        >
        <MessageList
          messages={this.state.messages}
          party={this.props.party}
          localUser={this.props.localUser}
        />
      </ScrollArea>
    )
  }

}


export default ChatText
