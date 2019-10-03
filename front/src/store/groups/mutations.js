function SET_GROUPS (state, groups) {
  state.groups = groups;
}

function SET_MANAGE_GROUPS (state, managegroups) {
  state.managegroups = managegroups;
}

function SET_MY_GROUPS (state, mygroups) {
  state.mygroups = mygroups;
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
  SET_GROUP_POST,
  SET_MANAGE_GROUPS,
  SET_MY_GROUPS
};