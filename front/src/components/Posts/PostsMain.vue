<template>
  <section class="section-center">
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
        <a
          :to="{ name: 'postForm' }"
        >
          <button>New post</button>
        </a>
        <form action="#" class="post-new-form">
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
        FriendsPosts
      ]
    }
  },
  components: {
    Posts,
    MyPosts,
    FriendsPosts
  }
}
</script>

<style>

</style>