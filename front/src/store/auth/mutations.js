import isEmpty from '../../validation/is-empty';

function setUser(state, user) {
  state.user = user;
  state.isAuthenticated = !isEmpty(user);
}

function resetUser(state) {
  state.user = {};
  state.isAuthenticated = false;
}

export {
  setUser,
  resetUser,
};
