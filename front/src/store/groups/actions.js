import axios from 'axios';
import {
  allGroupsUrl,
  oneGroupUrl,
} from '../urls';

function getGroups({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allGroupsUrl)  // Поменать на адрес получения массива групп
      .then((response) => {
        commit('SET_GROUPS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getGroup({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/groups/${id}`)
      .then((response) => {
        commit('SET_GROUP', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function getGroupPost({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/groups/${payload.id}/posts/${payload.post_id}`)
      .then((response) => {
        commit('SET_GROUP_POST', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function addGroupPostLike({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/groups/${payload.id}/posts/${payload.post_id}`)
      .then((response) => {
        commit('SET_GROUP_POST', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

export {
  getGroups,
  getGroup,
  getGroupPost,
  addGroupPostLike
};
