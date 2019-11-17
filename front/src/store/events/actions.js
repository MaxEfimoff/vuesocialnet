import axios from 'axios';
import { applyFilters } from '@/helpers';
import {
  allEventsUrl,
  addEventUrl,
} from '../urls';

function getEvents({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(allEventsUrl)  
      .then((response) => {
        commit('SET_EVENTS', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function getFoundEvents({ commit }, options = {}) {
  commit('SET_FOUND_EVENTS', {});
  // New Url with search filters applied
  const url = applyFilters(allEventsUrl, options.filter);

  return new Promise((resolve, reject) => {
    axios.get(url)  
      .then((response) => {
        commit('SET_FOUND_EVENTS', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function getEventById({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/api/events/${id}`)
    .then((response) => {
      commit('SET_EVENT', response.data);
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function addEvent({ commit }, data) {
  return new Promise((resolve, reject) => {
    data.location = data.location.toLowerCase().replace(/[\s,]+/g,'').trim();
    axios.post(addEventUrl, data)
      .then((response) => {
        commit('SET_EVENT', response.data);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

// function joinEvent({ commit, dispatch }, id) {
//   return new Promise((resolve, reject) => {
//     axios.post(`http://localhost:5000/api/events/join/${id}`, id)
//     .then((response) => {
//       commit('SET_EVENT', response.data[1]);
//       dispatch('profile/addEventToProfile', id, {root: true})
//       resolve();
//     })
//     .catch(error => console.log(error));
//   })
// };

function joinEvent({ commit, state, rootState, dispatch }, id) {
  const profile = rootState.profile.profile;
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/events/join/${id}`, id)
    .then(() => {
      const joinedPeople = state.event.joinedPeople;
      commit('ADD_PROFILE_TO_EVENT',  [...joinedPeople, profile]);
      dispatch('profile/addEventToProfile', id, {root: true})
      resolve();
    })
    .catch(error => console.log(error));
  })
};

function leaveEvent({ commit, state, rootState, dispatch }, id) {
  const profile = rootState.profile.profile;
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/events/leave/${id}`, id)
    .then(() => {
      const joinedPeople = state.event.joinedPeople;
      const index = joinedPeople.findIndex(jUser => jUser._id === profile._id);
      joinedPeople.splice(index, 1)
      commit('ADD_PROFILE_TO_EVENT', joinedPeople);
      dispatch('profile/removeEventFromProfile', id, {root: true})
      resolve();
    })
    .catch(error => console.log(error));
  })
};

// function deleteNote({ commit }, id) {
//   axios.delete(`http://localhost:5000/api/notes/${id}`)
//     .then((response) => {
//       commit('DELETE_NOTE', id);
//     })
//     .catch(error => console.log(error)
//     );
// };

export {
  getEvents,
  addEvent,
  getEventById,
  joinEvent,
  leaveEvent,
  getFoundEvents
};
