function SET_EVENTS (state, events) {
  state.events = events;
}

function SET_EVENT (state, event) {
  state.event = event;
}

function ADD_EVENT(state, event) {
  // Vue.set(state.events, event);
  // Object.assign(state.events, event);
  state.events.push(event)
}

function UPDATE_EVENT (state, event) {
  let index = state.events.findIndex(_event => _event.id == event.id)
  state.events[index].title = event.title;
  state.events[index].start = event.start;
  state.events[index].end = event.end;
}

function DELETE_EVENT(state, id) {
  // state.events = state.events.filter(event => event._id !== action.payload)
  Vue.delete(state.events, id);
}

export {
  SET_EVENTS,
  SET_EVENT,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
};