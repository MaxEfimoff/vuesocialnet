import axios from 'axios';
import {
  allCategoriesUrl
} from '../urls';

function getCategories({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allCategoriesUrl)  
      .then((response) => {
        commit('SET_CATEGORIES', response.data);
      })
      .catch(error => console.log(error));
  });
}


export {
  getCategories,
};
