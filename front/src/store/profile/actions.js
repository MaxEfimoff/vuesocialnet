import axios from 'axios';
import {
  profileUrl, allProfilesUrl, profileByHandleUrl,
  addToFriendsUrl
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

function getProfileByHandle({ commit }, handle) {
  return new Promise((resolve, reject) => {
    console.log('working')
    commit('CLEAR_ANOTHER_USER_PROFILE');
    axios.get(`http://localhost:5000/api/profile/handle/${handle}`)
    .then((response) => {
      commit('getAnotherUserProfile', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function getProfileById({ commit }, user) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/profile/user/${user}`)
    .then((response) => {
      commit('getAnotherUserProfile', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};


function addToFriends({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios.post(addToFriendsUrl, payload)
    .then((response) => {
        commit('getProfile', response.data);
        console.log(respose.data);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function deleteFromFriends({ commit }, handle) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:5000/api/profile/friends/${handle}`)
    .then((response) => {
        commit('getProfile', response.data);
        console.log(respose.data);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function getProfilePhotos({ commit }, handle) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/photos/handle/${handle}`)
    .then((response) => {
      commit('SET_PROFILE_PHOTOS', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function getProfileGroups({ commit }, handle) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/groups/handle/${handle}`)
    .then((response) => {
      console.log(response)
      commit('SET_PROFILE_GROUPS', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function getProfilePosts({ commit }, handle) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/posts/handle/${handle}`)
    .then((response) => {
      commit('SET_PROFILE_POSTS', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

export {
  exportCurrentProfile,
  createProfile,
  editProfile,
  getProfiles,
  getProfileByHandle,
  addToFriends,
  deleteFromFriends,
  getProfilePhotos,
  getProfilePosts,
  getProfileById,
  getProfileGroups
};