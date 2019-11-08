import axios from 'axios';
import {
  allEventsUrl, addEventUrl
} from '../urls';

function getEvents({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allEventsUrl)  
      .then((response) => {
        commit('SET_EVENTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

// function getNoteById({ commit }, id) {
//   return new Promise((resolve, reject) => {
//     axios.get(`http://localhost:5000/api/notes/${id}`)
//     .then((response) => {
//       commit('SET_NOTE', response.data);
//       resolve();
//     })
//     .catch(error => console.log(error));
//   })
// };

function addEvent({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(addEventUrl, data)
      .then((response) => {
        commit('SET_EVENT', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

// function deleteNote({ commit }, id) {
//   axios.delete(`http://localhost:5000/api/notes/${id}`)
//     .then((response) => {
//       commit('DELETE_NOTE', id);
//     })
//     .catch(error => console.log(error)
//     );
// };

export {
  getEvents,
  addEvent
  // getNotes,
  // getNoteById,
  // addNote,
  // deleteNote
};
