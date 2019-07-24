import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMessage } from '../actions/addMessage';

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
      this.props.addMessage(message);
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
        {this.props.messages.map((message, index) => (
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

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({addMessage: addMessage}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Chat);
