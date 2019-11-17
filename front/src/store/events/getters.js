function getEvents(state) {
  return state.events;
}

function getFoundEvents(state) {
  return state.foundEvents;
}

function getEvent(state) {
  return state.event;
}

export {
  getEvents,
  getEvent,
  getFoundEvents
};
