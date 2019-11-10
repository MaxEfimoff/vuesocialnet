import axios from 'axios';
import {
  allEventCategoriesUrl
} from '../urls';

function getEventCategories({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allEventCategoriesUrl)  
      .then((response) => {
        commit('SET_EVENT_CATEGORIES', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}


export {
  getEventCategories,
};
