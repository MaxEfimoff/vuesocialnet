import axios from 'axios';
import {
  profileUrl
} from '../urls';

// Get current profile
function exportCurrentProfile({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.get(profileUrl, data)
    .then((response) => {
        commit('getProfile', response.data);
        resolve();
      })
      .catch((error) => {
        // Return empty profile
        commit('getProfile', {});
      });
  });
}

function createProfile({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(profileUrl, data)
    .then((response) => {
        commit('getProfile', response.data);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function editProfile({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.put(profileUrl, data)
    .then((response) => {
        commit('getProfile', response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

export {
  exportCurrentProfile,
  createProfile,
  editProfile
};