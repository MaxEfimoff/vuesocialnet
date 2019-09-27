import axios from 'axios';
import {
  allDocumentsUrl, addDocumentUrl
} from '../urls';

function getDocuments({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allDocumentsUrl)  
      .then((response) => {
        commit('SET_DOCUMENTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getDocumentById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/Documents/${id}`)
    .then((response) => {
      commit('SET_DOCUMENT', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function addDocument({ commit }, formData) {
  return new Promise((resolve, reject) => {
    axios.post(addDocumentUrl, formData)
      .then((response) => {
        commit('SET_DOCUMENT', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

function deleteDocument({ commit }, id) {
  axios.delete(`http://localhost:5000/api/Documents/${id}`)
    .then((response) => {
      commit('DELETE_Document', id);
    })
    .catch(error => console.log(error)
    );
};

export {
  getDocuments,
  getDocumentById,
  addDocument,
  deleteDocument
};
