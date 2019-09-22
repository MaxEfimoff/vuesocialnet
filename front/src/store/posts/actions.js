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

function getPostById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
    .then((response) => {
      console.log(response);
      commit('SET_POST', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

export {
  getPosts,
  getPost,
  getPostById
};
