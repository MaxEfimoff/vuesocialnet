import Vue from 'vue';

function SET_EVENT_THREADS(state, eventthreads) {
  state.eventthreads = eventthreads;
}

function ADD_EVENT_THREAD(state, eventthread) {
  state.eventthreads.unshift(eventthread);
}

function SAVE_EVENT_POST_TO_EVENT_THREAD(state, {eventThreadPosts, index}) {
  Vue.set(state.eventthreads[index], 'eventThreadPosts', eventThreadPosts);
}

function SET_ALL_DATA_LOADED(state, isAllDataLoaded) {
  state.isAllDataLoaded = isAllDataLoaded;
}

function MERGE_EVENT_THREADS(state, eventthreads) {
  state.eventthreads = [...state.eventthreads, ...eventthreads]
}

export {
  SET_EVENT_THREADS,
  ADD_EVENT_THREAD,
  SAVE_EVENT_POST_TO_EVENT_THREAD,
  SET_ALL_DATA_LOADED,
  MERGE_EVENT_THREADS
};