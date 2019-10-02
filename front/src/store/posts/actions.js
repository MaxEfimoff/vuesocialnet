import axios from 'axios';
import {
  allPostsUrl,
  onePostUrl,
  addPostUrl,
  myPostsUrl,
  friendsPostsUrl
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

function getMyPosts({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(myPostsUrl)  
      .then((response) => {
        commit('SET_MY_POSTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getFriendsPosts({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(friendsPostsUrl)  
      .then((response) => {
        commit('SET_FRIENDS_POSTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getPost({ commit }, index) {
  return new Promise((resolve, reject) => {
    axios.get(onePostUrl, { id: index })
      .then((response) => {
        commit('SET_POST', response.data.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function addPost({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(addPostUrl, data)
      .then((response) => {
        commit('SET_POST', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function getPostById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
    .then((response) => {
      commit('SET_POST', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  });
}

function addComment({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/posts/comment/${payload.postId}`, payload.formData)
      .then((response) => {
        commit('SET_POST', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

function addLike({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/posts/like/${id}`)
      .then((response) => {
        commit('SET_POST', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

export {
  getPosts,
  getPost,
  getPostById,
  addPost,
  getMyPosts,
  getFriendsPosts,
  addComment,
  addLike
};
