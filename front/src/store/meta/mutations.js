function SET_METADATA (state, metadata) {
  state.metadata = metadata;
}

function RESOLVE_LOCATION (state, isLocationResolved) {
  state.isLocationResolved = isLocationResolved;
}

export {
  SET_METADATA,
  RESOLVE_LOCATION
};