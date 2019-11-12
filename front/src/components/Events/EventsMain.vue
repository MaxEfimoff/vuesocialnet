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
            >Friends Events</a>
          </li>
          <li>
            <a href="">Liked</a>
          </li>
        </ul>
        <ModalEvent/>
        <form action="#" class="search-form leftmargin">
          <input type="text" placeholder="Event search" />
        </form>
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
import FriendsEvents from'./FriendsEvents';
import ModalEvent from '@/components/Events/ModalEvent.vue';

import { mapState } from 'vuex';

export default {
  name: 'EventsMain',
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
  data() {
    return {
      activeStep: 1,
      steps: [
        Events,
        MyEvents,
        FriendsEvents,
      ]
    }
  },
  components: {
    Events,
    MyEvents,
    FriendsEvents,
    ModalEvent
  }
}
</script>

<style>

</style>