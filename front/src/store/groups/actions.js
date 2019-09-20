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

function getGroup({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.get(oneGroupUrl, { id: index })
      .then((response) => {
        commit('setGroup', response.data.data);

        resolve();
      })
      .catch(error => console.log(error));
  });
}

export {
  getGroups,
  getGroup,
};
