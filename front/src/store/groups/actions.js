import axios from 'axios';
import {
  allGroupsUrl,
  createGroupUrl,
  manageGroupsUrl,
  myGroupsUrl
} from '../urls';

function getGroups({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allGroupsUrl)
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

function getManageGroups({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(manageGroupsUrl)  
      .then((response) => {
        commit('SET_MANAGE_GROUPS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getMyGroups({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(myGroupsUrl)  
      .then((response) => {
        commit('SET_MY_GROUPS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function createGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(createGroupUrl, data)
      .then((response) => {
        commit('ADD_GROUP', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function updateGroup({ commit, state }) {
  const group = state.group
  return new Promise((resolve, reject) => {
    axios.patch(`http://localhost:5000/api/groups/${group._id}/update-group`, group)
      .then((response) => {
        commit('SET_GROUP', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
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

function createGroupPost({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/groups/${payload.id}/post`, payload.formData)
      .then((response) => {
        commit('SET_GROUP', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function updateGroupPost({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.patch(`http://localhost:5000/api/groups/${payload.groupid}/post/${payload.id}`, payload.FormData)
      .then((response) => {
        commit('SET_GROUP_POST', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function subscribe({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/groups/subscribe/${id}`, id)
      .then((response) => {
        commit('ADD_TO_MY_GROUPS', response.data);
        commit('SET_GROUP', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function unsubscribe({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/groups/unsubscribe/${id}`, id)
      .then((response) => {
        commit('REMOVE_FROM_MY_GROUPS', response.data._id);
        commit('SET_GROUP', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
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

function addPostComment({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/groups/${payload.id}/comments/${payload.post_id}`, payload.formData)
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
  addGroupPostLike,
  addPostComment,
  createGroup,
  subscribe,
  unsubscribe,
  createGroupPost,
  getManageGroups,
  getMyGroups,
  updateGroup,
  updateGroupPost
};
