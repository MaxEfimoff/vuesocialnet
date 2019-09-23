import axios from 'axios';
import {
  allNotesUrl, addNoteUrl
} from '../urls';

function getNotes({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allNotesUrl)  
      .then((response) => {
        commit('SET_NOTES', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getNoteById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/notes/${id}`)
    .then((response) => {
      commit('SET_NOTE', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function addNote({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(addNoteUrl, data)
      .then((response) => {
        commit('SET_NOTE', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function deleteNote({ commit }, id) {
  axios.delete(`http://localhost:5000/api/notes/${id}`)
    .then((response) => {
      commit('DELETE_NOTE', id);
    })
    .catch(error => console.log(error)
    );
};

export {
  getNotes,
  getNoteById,
  addNote,
  deleteNote
};
