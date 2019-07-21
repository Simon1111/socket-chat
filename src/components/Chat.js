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
    this.state.socket.emit('message', {message: '123'});

    this.state.socket.on('message', message => {
      console.log(message)
      this.setState({
        messages: [message, ...this.state.messages]
      });
    });
  }
  
  submitMessage = event => {
    if (event.keyCode === 13 && event.target.value !== '') {
      // console.log(event.target.value);
      this.state.socket.emit('message', {
        message: event.target.value
      });
      // this.setState({
      //   messages: [event.target.value, ...this.state.messages]
      // });
      event.target.value = '';
    }
  };

  render() {
    return (<div>
      <ul className="chat__messages">
        {this.state.messages.map((message, index) => (
          <li>
            {message}
          </li>
        ))}
      </ul>
      <input type="text" onKeyUp={this.submitMessage} />
    </div>
    );
  }
}

export default Chat;
