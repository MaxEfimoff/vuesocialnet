import axios from 'axios';
import {
  allNotesUrl,
} from '../urls';

function getNotes({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allNotesUrl)  
      .then((response) => {
        console.log(response);
        commit('SET_NOTES', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getNoteById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/notes/${id}`)
    .then((response) => {
      console.log(response);
      commit('SET_NOTE', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

export {
  getNotes,
  getNoteById
};
