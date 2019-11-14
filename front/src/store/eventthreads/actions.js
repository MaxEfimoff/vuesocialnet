import axios from 'axios';
import {
  addEventThreadUrl,
  addPostToEventThreadUrl
} from '../urls';

function getEventThreadsByEventId({ commit }, eventId) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/eventthreads?eventId=${eventId}`) 
      .then((response) => {
        commit('SET_EVENT_THREADS', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function addEventThread({ commit }, data) {
  const thread = {};
    thread.title = data.formData.title;
    thread.event = data.event;
    thread.profile = data.profile;
  return new Promise((resolve, reject) => {
    axios.post(addEventThreadUrl, thread)
      .then((response) => {
        commit('ADD_EVENT_THREAD', response.data);
        resolve();
      })
      .catch(error => {
        // commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function sendEventPost({ dispatch }, payload) {
  const post = {};
    post.text = payload.text;
    post.eventThread = payload.eventThreadId;
    post.profile = payload.profile;
    return new Promise((resolve, reject) => {
      axios.post(addPostToEventThreadUrl, post)
        .then((response) => {
          const createdEventPost = response.data;
          dispatch('addPostToEventThread', {eventPost: createdEventPost, eventThreadId: post.eventThread});
          resolve();
        })
        .catch(error => {
          // commit('errors/setErrors', error.response.data, { root: true });
          console.log(error)
        });
    });
}

function addPostToEventThread ({commit, state}, {eventPost, eventThreadId}) {
  const eventThreadIndex = state.eventthreads.eventthreads.findIndex(eventThread => eventThread._id === eventThreadId);
  console.log('eventThreadIndex', eventThreadIndex)
  if (eventThreadIndex > -1) {
    const eventThreadPosts = state.eventthreads.eventthreads[eventThreadIndex].eventThreadPosts;
    console.log('eventThreadPosts', eventThreadPosts)
    eventThreadPosts.unshift(eventPost)
    commit('SAVE_EVENT_POST_TO_EVENT_THREAD', {eventThreadPosts, index: eventThreadIndex})
  }
}

export {
  getEventThreadsByEventId,
  addEventThread,
  sendEventPost,
  addPostToEventThread
};
