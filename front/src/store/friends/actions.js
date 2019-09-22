import axios from 'axios';
import {
  allFriendsUrl,
} from '../urls';

function getFriends({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allFriendsUrl) 
      .then((response) => {
        commit('SET_FRIENDSS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getFriendById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/friends/${id}`)
    .then((response) => {
      console.log(response);
      commit('SET_FRIEND', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

export {
  getFriends,
  getFriendById
};
