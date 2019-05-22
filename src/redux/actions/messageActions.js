import axios from 'axios';

export const updateMessages = messages => {
  return {
    type: 'UPDATE_MESSAGES',
    messages,
  };
};

export const insertMessage = message => {
  console.log('inserting message')
  return {
    type: 'INSERT_MESSAGE',
    message,
  };
};

export const insertMessage2 = message => {
  console.log('inserting message2')
  return {
    type: 'INSERT_MESSAGE2',
    message,
  }
}

export const handlTextChange = text => {
  return {
    type: 'UPDATE_TEXT',
    text,
  };
};

export const MessageType = value => {
  console.log('setting message type')
  return {
    type: 'SET_TYPE',
    value,
  }
}

export const submitMessage = () => (dispatch, getState) => {
  axios.post('/messanger/postMessage', { message: getState().messageReducer.text }) //Post takes extra parameter for data you want to send
    .then(() => { })
    .catch(e => console.log(e));
  dispatch(handlTextChange(''));
};

export const submitMessage2 = () => (dispatch, getState) => {
  axios.post('/messanger/postMessage2', { message: getState().messageReducer.text }) //Post takes extra parameter for data you want to send
    .then(() => { })
    .catch(e => console.log(e));
  dispatch(handlTextChange(''));
};