function SET_GROUPS (state, groups) {
  state.groups = groups;
}

function SET_GROUP (state, group) {
  state.group = group;
}

export {
  SET_GROUPS,
  SET_GROUP
};