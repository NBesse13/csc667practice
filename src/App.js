import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage, submitMessage2, MessageType } from './redux/actions/messageActions';
import './App.css';

const Message = ({ data }) => (<div>{data}</div>);

class App extends Component {
  componentDidMount() {
    axios.get('/messanger/getMessages')
      .then((res) => {
        this.props.updateMessages(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSubmit = () => {
    if(this.props.messageType === "message1"){
      this.props.submitMessage();
    }else{
      this.props.submitMessage2();
    }
  }

  handleTextChange = (e) => {
    this.props.handlTextChange(e.target.value);
  }

  MessageType = (e) => {
    this.props.MessageType(e.target.value);
  }

  consoleLogClick = () => {
    console.log(this.props)
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="message-area">
            {this.props.messages.map((message, i) => <Message key={i} data={message} />)}
          </div>
        </div>
        <div>
          <input type="text" value={this.props.text} onChange={this.handleTextChange} />
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
        <div>
          <select onChange={this.MessageType} value={this.props.messageType}>
            <option value="message1">First Channel</option>
            <option value="message2">Second Channel</option>
            </select>
          <div className="message-area">
            {this.props.messages.map((message, i) => <Message key={i} data={message} />)}
          </div>
        </div>
        <button onClick={this.conoleLogClick} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messages,
    text: state.messageReducer.text,
    messageType: state.messageReducer.messageType,
  };
};

const mapDispatchToProps = { updateMessages, handlTextChange, submitMessage, submitMessage2, MessageType };

export default connect( // from react-redux
  mapStateToProps,
  mapDispatchToProps,
)(App);
