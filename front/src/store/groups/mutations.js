function SET_GROUPS (state, groups) {
  state.groups = groups;
}

function SET_MANAGE_GROUPS (state, managegroups) {
  state.managegroups = managegroups;
}

function SET_MY_GROUPS (state, mygroups) {
  state.mygroups = mygroups;
}

function ADD_TO_MY_GROUPS (state, group) {
  state.mygroups.unshift(group);
}

function REMOVE_FROM_MY_GROUPS (state, id) {
  const removeGroupIndex = state.mygroups.findIndex(x => x._id === id);
  state.mygroups.splice(removeGroupIndex, 1);
}

function SET_GROUP (state, group) {
  state.group = group;
}

function ADD_GROUP (state, group) {
  state.groups.unshift(group)
}

function SET_GROUP_POST (state, grouppost) {
  state.grouppost = grouppost;
}

export {
  SET_GROUPS,
  SET_GROUP,
  SET_GROUP_POST,
  SET_MANAGE_GROUPS,
  SET_MY_GROUPS,
  ADD_GROUP,
  ADD_TO_MY_GROUPS,
  REMOVE_FROM_MY_GROUPS
};