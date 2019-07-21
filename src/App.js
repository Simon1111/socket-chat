import React from 'react';
import Chat from './components/Chat';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.socket = io('http://localhost:3000/');
  }

  render () {
    return <Chat
      socket={this.socket}
    />;
  }
}

export default App;
