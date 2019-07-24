import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: this.props.socket
    };
  }

  componentDidMount() {
    console.log(this.props.messages);
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

function mapStateToProps(state) {
  return{
    messages: state.messages
  };
}

function matchDispatchToProps(dispatch) {
  return {};
  // bindActionCreators({select: select}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Chat);
