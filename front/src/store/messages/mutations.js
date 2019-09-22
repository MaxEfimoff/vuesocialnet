function SET_MESSAGES (state, messages) {
  state.messages = messages;
}

function SET_MESSAGE (state, message) {
  state.message = message;
}

export {
  SET_MESSAGES,
  SET_MESSAGE
};