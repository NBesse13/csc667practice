const INITIAL_STATE = {
  messages: [],
  text: '',
  messageType: '',
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        messages: action.messages,
      };
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: action.text,
      };
    case 'INSERT_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case 'INSERT_MESSAGE2':
        return {
          ...state,
          messages: [...state.messages, action.message],
        };
    case 'SET_TYPE':
      return{
        ...state,
        messageType : action.value,
      }
    default:
      return state;
  }
};

export default messageReducer;