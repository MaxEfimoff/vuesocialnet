<template>
  <section class="section-center" v-if="this.profile.handle">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li>
            <a 
              @click.prevent="navigateTo(1)"
              :class="activeComponentClass(1)"
            >All Posts</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(2)"
              :class="activeComponentClass(2)"
            >My Posts</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(3)"
              :class="activeComponentClass(3)"
            >Friends Posts</a>
          </li>
          <li>
            <a href="">Liked</a>
          </li>
        </ul>
        <ModalCreatePost/>
        <form action="#" class="search-form leftmargin">
          <input type="text" placeholder="Post search" />
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
import Posts from'./Posts';
import MyPosts from'./MyPosts';
import FriendsPosts from'./FriendsPosts';
import ModalCreatePost from './ModalCreatePost.vue';

import { mapState } from 'vuex';

export default {
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
        Posts,
        MyPosts,
        FriendsPosts,
      ]
    }
  },
  components: {
    Posts,
    MyPosts,
    FriendsPosts,
    ModalCreatePost
  }
}
</script>

<style>

</style>