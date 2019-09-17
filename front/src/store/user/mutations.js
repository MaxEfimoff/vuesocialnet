function setUser(state, user) {
  state.user = user;
}

function resetUser(state) {
  state.user = {};
}

function setErrors(state, errors) {
  state.errors = errors;
}

export {
  setUser,
  resetUser,
  setErrors,
};
