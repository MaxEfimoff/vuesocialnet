import Vue from 'vue';

function SET_EVENTS (state, events) {
  state.events = events;
}

function SET_EVENT (state, event) {
  state.event = event;
}

function ADD_EVENT(state, event) {
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

function ADD_PROFILE_TO_EVENT (state, joinedPeople) {
  Vue.set(state.event, 'joinedPeople', joinedPeople);
}

export {
  SET_EVENTS,
  SET_EVENT,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  ADD_PROFILE_TO_EVENT
};