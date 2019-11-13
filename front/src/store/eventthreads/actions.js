import axios from 'axios';
import {
  addEventThreadUrl
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
  const thread = {}
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
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

export {
  getEventThreadsByEventId,
  addEventThread
};
