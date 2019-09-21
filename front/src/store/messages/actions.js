import axios from 'axios';
import {
  allMessagesUrl,
  oneMessageUrl,
} from '../urls';

function getMessages({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allMessagesUrl) 
      .then((response) => {
        commit('SET_MESSAGES', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getMessage({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.get(oneMessageUrl, { id: index })
      .then((response) => {
        commit('setMessage', response.data.data);

        resolve();
      })
      .catch(error => console.log(error));
  });
}

export {
  getMessages,
  getMessage,
};