function SET_GROUPS (state, groups) {
  state.groups = groups;
}

function SET_GROUP (state, group) {
  state.group = group;
}

function SET_GROUP_POST (state, grouppost) {
  state.grouppost = grouppost;
}

export {
  SET_GROUPS,
  SET_GROUP,
  SET_GROUP_POST
};