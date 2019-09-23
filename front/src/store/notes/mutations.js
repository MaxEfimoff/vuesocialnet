function SET_NOTES (state, notes) {
  state.notes = notes;
}

function SET_NOTE (state, note) {
  state.note = note;
}

function ADD_NOTE(state, note) {
  // Vue.set(state.notes, note);
  Object.assign(state.notes, note);
}

function DELETE_NOTE(state, id) {
  // state.notes = state.notes.filter(note => note._id !== action.payload)
  Vue.delete(state.notes, id);
}

export {
  SET_NOTES,
  SET_NOTE,
  ADD_NOTE,
  DELETE_NOTE
};