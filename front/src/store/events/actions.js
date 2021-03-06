import axios from 'axios';
import { applyFilters } from '@/helpers';
import {
  allEventsUrl,
  addEventUrl,
  myEventsUrl,
  myJoinedEventsUrl
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

function getMyEvents({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(myEventsUrl)  
      .then((response) => {
        commit('SET_MY_EVENTS', response.data);
        resolve();
      })
      .catch(error => console.log(error));
  });
}

function getMyJoinedEvents({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get(myJoinedEventsUrl)  
      .then((response) => {
        commit('SET_MY_JOINED_EVENTS', response.data);
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

function deleteEvent({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
    .then(() => {
      commit('SET_EVENT', {});
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

function updateEvent({ commit }, event) {
  return new Promise((resolve, reject) => {
    event.location = event.location.toLowerCase().replace(/[\s,]+/g,'').trim();
    axios.patch(`http://localhost:5000/api/events/${event._id}/update-event`, event)
      .then((response) => {
        const updatedEvent = response.data;
        commit('MERGE_EVENT', updatedEvent);
        resolve();
      })
      .catch(error => {
        console.log(error)
      });
  });
}

function joinEvent({ commit, state, rootState, dispatch }, id) {
  const profile = rootState.profile.profile;
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:5000/api/events/join/${id}`, id)
    .then(() => {
      const joinedPeople = state.event.joinedPeople;
      commit('SET_MY_JOINED_EVENTS', state.event);
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
      const joinedPeople = state.event.joinedPeople || null;
      const index = joinedPeople.findIndex(jUser => jUser._id === profile._id);
      joinedPeople.splice(index, 1)
      commit('ADD_PROFILE_TO_EVENT', joinedPeople);
      dispatch('profile/removeEventFromProfile', id, {root: true})
      resolve();
    })
    .catch(error => console.log(error));
  })
};

export {
  getEvents,
  getMyEvents,
  addEvent,
  getEventById,
  joinEvent,
  leaveEvent,
  getFoundEvents,
  updateEvent,
  deleteEvent,
  getMyJoinedEvents
};
