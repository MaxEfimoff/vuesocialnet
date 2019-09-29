import axios from 'axios';
import {
  allPhotosUrl, addPhotoUrl
} from '../urls';

function getPhotos({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/photos`)  
      .then((response) => {
        commit('SET_PHOTOS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getPhoto({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/photos/${id}`)
    .then((response) => {
      commit('SET_PHOTO', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function addPhoto({ commit }, formData) {
  return new Promise((resolve, reject) => {
    axios.post(addPhotoUrl, formData, {
      params: {
        user: req.user.id
      }
    })
      .then((response) => {
        commit('SET_PHOTO', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

function deletePhoto({ commit }, id) {
  axios.delete(`http://localhost:5000/api/photos/${id}`)
    .then((response) => {
      commit('DELETE_PHOTO', id);
    })
    .catch(error => console.log(error)
    );
};

export {
  getPhotos,
  getPhoto,
  addPhoto,
  deletePhoto
};
