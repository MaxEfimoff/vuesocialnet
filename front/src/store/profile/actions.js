import axios from 'axios';
import {
  profileUrl, allProfilesUrl
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

function getProfiles({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allProfilesUrl)  
      .then((response) => {
        commit('SET_PROFILES', response.data);
      })
      .catch(error => console.log(error));
  });
}

export {
  exportCurrentProfile,
  createProfile,
  editProfile,
  getProfiles
};