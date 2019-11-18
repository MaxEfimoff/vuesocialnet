import axios from 'axios';
import {
  addEventThreadUrl,
  addPostToEventThreadUrl
} from '../urls';
import { applyFilters } from '@/helpers';

function getEventThreadsByEventId({ commit }, {eventId, filter = {}, init}) {
  
  if(init) {
    commit('SET_EVENT_THREADS', []);
  }
  const url = applyFilters(`http://localhost:5000/api/eventthreads?eventId=${eventId}`, filter);

  return new Promise((resolve, reject) => {
    axios.get(url) 
      .then((response) => {
        const isAllDataLoaded = response.data.isAllDataLoaded;
        const eventthreads = response.data.eventthreads;
        commit('SET_ALL_DATA_LOADED', isAllDataLoaded);
        commit('MERGE_EVENT_THREADS', eventthreads);
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

function sendEventPost({ dispatch }, {text, eventThreadId}) {
  const post = {text, eventThread: eventThreadId}
    return axios.post(addPostToEventThreadUrl, post)
      .then((response) => {
        const createdEventPost = response.data;
        dispatch('addPostToEventThread', {post: createdEventPost, eventThreadId})
        return createdEventPost;
      })
      .catch(error => {
        // commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
}

function addPostToEventThread ({commit, state}, {post, eventThreadId}) {
  const eventThreadIndex = state.eventthreads.findIndex(eventThread => eventThread._id === eventThreadId)

  if (eventThreadIndex > -1) {
    const eventThreadPosts = state.eventthreads[eventThreadIndex].eventThreadPosts;
    eventThreadPosts.push(post);
    commit('SAVE_EVENT_POST_TO_EVENT_THREAD', {eventThreadPosts, index: eventThreadIndex});
  }
}

export {
  getEventThreadsByEventId,
  addEventThread,
  sendEventPost,
  addPostToEventThread
};
