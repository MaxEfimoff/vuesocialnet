function setUser(state, user) {
  state.user = user;
}

function resetUser(state) {
  state.user = {};
}

export {
  setUser,
  resetUser,
};
