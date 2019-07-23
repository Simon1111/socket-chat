import React from 'react';
import Chat from './components/Chat';
import io from 'socket.io-client';
import '../assets/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.socket = io('/');
  }

  render () {
    return <Chat
        socket={this.socket}
      />;
  }
}

export default App;
