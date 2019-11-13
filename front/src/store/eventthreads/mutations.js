function SET_EVENT_THREADS(state, eventthreads) {
  state.eventthreads = eventthreads
}

function ADD_EVENT_THREAD (state, eventthread) {
  state.eventthreads.unshift(eventthread)
}

export {
  SET_EVENT_THREADS,
  ADD_EVENT_THREAD
};