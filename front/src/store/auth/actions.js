import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  registerUrl,
  loginUrl,
  checkAuthUrl,
  resetPasswordUrl,
  loginViaGoogleUrl,
  loginViaFacebookUrl
} from '../urls';

function register({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(registerUrl, data)
    .then((response) => {
        commit('setUser', response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function activateUser({}, hash) {
  console.log('sending request for hash', hash)
  // return new Promise((resolve, reject) => {
  //   axios.post(registerUrl, data)
  //   .then((response) => {
  //       commit('setUser', response.data);
  //       console.log(response.data);
  //       resolve();
  //     })
  //     .catch((error) => {
  //       commit('errors/setErrors', error.response.data, { root: true });
  //       console.log(error.response.data)
  //     });
  // });
}

function resetPassword({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(resetPasswordUrl, data)
      .then(() => {
        commit('resetUser');
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error.response.data)
      });
  });
}

function login({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(loginUrl, data)
    .then((response) => {
        // Save token from 'response.data' to local storage
        const { token } = response.data;
        // Set token to local storage. Local storage only stores strings.
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        commit('setUser', decoded);
        resolve();
      })
      .catch((error) => {
        commit('errors/setErrors', error.response.data, { root: true });
      });
  });
}

function loginViaGoogle({ commit }, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.post(loginViaGoogleUrl, {
      access_token: data
    })
    .then((response) => {
      console.log(response)
      resolve();
    })
    .catch((error) => {
      console.log(error)
    });
  });
}

function loginViaFacebook({ commit }, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.post(loginViaFacebookUrl, {
      access_token: data
    })
    .then((response) => {
      console.log(response)
      resolve();
    })
    .catch((error) => {
      console.log(error)
    });
  });
}

function logout({ commit }) {

  // Remove token from localStorage
  localStorage.removeItem("jwtToken");

  // Remove auth geader for future requests
  setAuthToken(false);
  
  // Set currentUser to {} wich will set isAuthenticated to false
  commit('resetUser');
}

function checkUser({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(checkAuthUrl)
      .then((response) => {
        const user = response.data.data;

        if (user) {
          commit('setUser', user);
        } else {
          commit('resetUser');
        }

        resolve();
      })
      .catch(error => console.log(error));
  });
}

export {
  register,
  login,
  logout,
  checkUser,
  resetPassword,
  loginViaGoogle,
  loginViaFacebook,
  activateUser
};
