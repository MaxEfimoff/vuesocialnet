function setUser(state, user) {
  state.user = user;
  state.isAuthenticated = true;
}

function resetUser(state) {
  state.user = {};
}

export {
  setUser,
  resetUser,
};
