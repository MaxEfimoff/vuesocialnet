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
          <router-link
            :to="{ name: 'postForm' }"
          >
            <button>New post</button>
          </router-link>
          <form action="#" class="post-new-form">
            <input type="text" placeholder="Post search" />
          </form>
        </div>
        <div class="post-wrapper">
          <div class="post" v-for="post in posts.slice(0, 10)" :key="post.id">
            <div class="post-author flex">
              <router-link
                :to="`/profile/handle/${post.name}`">
                <div>
                  <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
                  <div class='text-center'>
                    <span>{{ post.name }}</span>
                  </div>
                </div>
              </router-link>
              <router-link
                :to="`/posts/${post._id}`"
              >
              <div class="leftmargin">
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
// import Header from '@/components/Header.vue'
// import LeftSection from '@/components/LeftSection.vue'
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
