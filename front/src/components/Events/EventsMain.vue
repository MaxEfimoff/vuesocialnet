<template>
  <section class="section-center" v-if="this.profile.handle">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li>
            <a 
              @click.prevent="navigateTo(1)"
              :class="activeComponentClass(1)"
            >All Events</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(2)"
              :class="activeComponentClass(2)"
            >My Events</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(3)"
              :class="activeComponentClass(3)"
            >My Joined Events</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(4)"
              :class="activeComponentClass(4)"
            >Search Events</a>
          </li>
        </ul>
        <ModalEvent/>
      </div>
      <keep-alive>
        <component
          :is="activeComponent" 
          />
      </keep-alive>
    </div>
  </section>
</template>

<script>
import Events from'./Events';
import MyEvents from'./MyEvents';
import MyJoinedEvents from'./MyJoinedEvents';
import EventsSearch from'./EventsSearch';
import ModalEvent from '@/components/Events/ModalEvent.vue';

import { mapState } from 'vuex';
import EventsSearchVue from './EventsSearch.vue';

export default {
  name: 'EventsMain',
    data() {
      return {
        activeStep: 1,
        steps: [
          Events,
          MyEvents,
          MyJoinedEvents,
          EventsSearch,
        ]
      }
    },
  methods: {
    navigateTo(step) {
      this.activeStep = step;
    },
    activeComponentClass(step) {
      return this.activeStep === step ? 'is-active' : ''
    }
  },
  computed: {
    ...mapState('profile', ['profile']),
    activeComponent() {
      return this.steps[this.activeStep - 1]
    }
  },
  components: {
    Events,
    MyEvents,
    ModalEvent,
    EventsSearch,
    MyJoinedEvents
  }
}
</script>

<style>

</style>