<template>
  <div>
    <section class="section-center" v-if="this.profile.handle">
      <div class="post-wrapper">
        <div class="post" v-for="post in posts.slice(0, 10)" :key="post.id">
          <div class="post-author">
            <router-link
              :to="`/profile/handle/${post.name}`">
              <div>
                <img class="groups-img" :src="post.avatar" alt="">
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
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostHeader from '../helpers/PostsHeader';

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
  components: {
    PostHeader
  }
}
</script>