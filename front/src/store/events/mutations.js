import Vue from 'vue';

function SET_EVENTS (state, events) {
  state.events = events;
}

function SET_EVENT (state, event) {
  state.event = event;
}

function SET_FOUND_EVENTS (state, foundEvents) {
  state.foundEvents = foundEvents;
}

function ADD_EVENT(state, event) {
  state.events.push(event)
}

function MERGE_EVENT(state, updatedEvent) {
  state.event = {...state.event, ...updatedEvent}
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
  MERGE_EVENT,
  DELETE_EVENT,
  ADD_PROFILE_TO_EVENT,
  SET_FOUND_EVENTS
};