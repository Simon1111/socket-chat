import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: this.props.socket
    };
  }

  componentDidMount() {
    this.state.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages]
      });
    });
  }
  
  submitMessage = event => {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.state.socket.emit('message', {
        message: event.target.value
      });
      event.target.value = '';
    }
  };

  render() {
    return (<div>
      <ul className="chat__messages">
        {this.state.messages.map((message, index) => (
          <li className="chat__messages--message">
            {message}
          </li>
        ))}
      </ul>
      <input className="chat__messages--box" type="text" onKeyUp={this.submitMessage} placeholder="Your message" />
    </div>
    );
  }
}

export default Chat;
