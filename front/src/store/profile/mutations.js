function getProfile(state, profile) {
  state.profile = profile;
}

function setProfile(state, newProfile) {
  state.profile = newProfile;
}

function resetProfile(state) {
  state.profile = {};
}

export {
  getProfile,
  resetProfile,
  setProfile
};
