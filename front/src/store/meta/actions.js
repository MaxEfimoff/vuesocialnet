import axios from 'axios';
import {
  myMetaDataUrl,
} from '../urls';

function getMetaData({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(myMetaDataUrl)  
      .then((response) => {
        commit('SET_METADATA', response.data);
        console.log(response.data)
      })
      .catch(error => console.log(error));
  });
}

export {
  getMetaData,
};
