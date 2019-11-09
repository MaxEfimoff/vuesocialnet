import axios from 'axios';
import {
  allProductsUrl,
  oneProductUrl,
  addProductUrl,
  myProductsUrl,
  friendsProductsUrl
} from '../urls';

function getProducts({ commit }) {
  commit('RESET_PRODUCTS');
  return new Promise((resolve, reject) => {
    axios.get(allProductsUrl)  
      .then((response) => {
        commit('SET_PRODUCTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getMyProducts({ commit }) {
  commit('RESET_MY_PRODUCTS');
  return new Promise((resolve, reject) => {
    axios.get(myProductsUrl)  
      .then((response) => {
        commit('SET_MY_PRODUCTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getFriendsProducts({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(friendsProductsUrl)  
      .then((response) => {
        commit('SET_FRIENDS_PRODUCTS', response.data);
      })
      .catch(error => console.log(error));
  });
}

function getProduct({ commit }, index) {
  commit('RESET_PRODUCT');
  return new Promise((resolve, reject) => {
    axios.get(oneProductUrl, { id: index })
      .then((response) => {
        commit('SET_PRODUCT', response.data.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function addProduct({ commit }, data) {
  return new Promise((resolve, reject) => {
    axios.post(addProductUrl, data)
      .then((response) => {
        commit('ADD_PRODUCT', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function updateProduct({ commit, state }) {
  const product = state.product;
  return new Promise((resolve, reject) => {
    axios.patch(`http://localhost:5000/api/products/${product._id}/update-product`, product)
      .then((response) => {
        commit('SET_PRODUCT', response.data);
        resolve();
      })
      .catch(error => {
        commit('errors/setErrors', error.response.data, { root: true });
        console.log(error)
      });
  });
}

function getProductById({ commit }, id) {
  commit('RESET_PRODUCT');
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/products/${id}`)
    .then((response) => {
      commit('SET_PRODUCT', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  });
}

function addComment({ commit }, payload) {
  return new Promise((resolve, reject) => {
    console.log(payload.formData)
    axios.post(`http://localhost:5000/api/products/comment/${payload.productId}`, payload.formData)
      .then((response) => {
        commit('SET_PRODUCT', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

function addLike({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/products/like/${id}`)
      .then((response) => {
        commit('SET_PRODUCT', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

export {
  getProducts,
  getProduct,
  getProductById,
  addProduct,
  getMyProducts,
  getFriendsProducts,
  addComment,
  addLike,
  updateProduct
};
