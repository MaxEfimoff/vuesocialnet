function getProfile(state, profile) {
  state.profile = profile;
}

function setProfile(state, newProfile) {
  state.profile = newProfile;
}

function resetProfile(state) {
  state.profile = {};
}

function SET_PROFILES (state, profiles) {
  state.profiles = profiles;
}

function getAnotherUserProfile(state, anotherUserProfile) {
  state.anotherUserProfile = anotherUserProfile;
}

export {
  getProfile,
  resetProfile,
  setProfile,
  SET_PROFILES,
  getAnotherUserProfile
};
