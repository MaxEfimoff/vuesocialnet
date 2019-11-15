import Vue from 'vue';

function SET_EVENT_THREADS(state, eventthreads) {
  state.eventthreads = eventthreads;
}

function ADD_EVENT_THREAD (state, eventthread) {
  state.eventthreads.eventthreads.unshift(eventthread);
}

function SAVE_EVENT_POST_TO_EVENT_THREAD (state, {eventThreadPosts, index}) {
  Vue.set(state.eventthreads.eventthreads[index], 'eventThreadPosts', eventThreadPosts);
}

export {
  SET_EVENT_THREADS,
  ADD_EVENT_THREAD,
  SAVE_EVENT_POST_TO_EVENT_THREAD
};