import axios from 'axios';
import {
  allPostsUrl,
  onePostUrl,
} from '../urls';

function getPosts({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allPostsUrl)  
      .then((response) => {
        commit('SET_POSTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getPost({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.get(onePostUrl, { id: index })
      .then((response) => {
        commit('setPost', response.data.data);

        resolve();
      })
      .catch(error => console.log(error));
  });
}

export {
  getPosts,
  getPost,
};
