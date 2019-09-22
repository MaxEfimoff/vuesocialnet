<template>
  <div>
    <section class="section-center" v-if="this.profile.handle">
      <div class="section posts">
        <div class="friends-list padding">
          <ul  class="flex">
             <li>
              <a href="">All Posts</a>
            </li>
            <li>
              <a href="">My Posts</a>
            </li>
            <li>
              <a href="">Friends Posts</a>
            </li>
            <li>
              <a href="">Recommended</a>
            </li>
            <li>
              <a href="">Liked</a>
            </li>
          </ul>
          <button>New post</button>
          <form action="#" class="post-new-form">
            <input type="text" placeholder="Post search" />
          </form>
        </div>
        <div class="post-wrapper">
          <div class="post" v-for="post in posts.slice(0, 10)" :key="post.id">
            <div class="post-author">
              <router-link
                    :to="`/posts/${post._id}`"
                  >
              <div class="groups-photo">
                <img class="groups-img" src="../../assets/img/groups/01.jpg" alt="">
                <span>{{ post.text }}</span>
              </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="register">
      <div class="section posts padding">
        <h4>Welcome, {{ user.name }}! Please setup your profile!</h4>
        <div class="edit-profile">
          <router-link
            :to="{ name: 'createProfile' }">
            <!-- <img :src=" require (`${user.avatar}`) " alt=""> -->
            <span>Create profile</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'
// import PostsMain from '@/components/PostsMain.vue'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Posts',
  created() {
    this.getPosts();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('posts', ['posts']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions("posts", ['getPosts']),
  },
}
</script>
