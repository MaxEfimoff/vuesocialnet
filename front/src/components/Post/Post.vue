<template>
  <section class="section-center">
    <div class="section posts">
      <PostHeader />
      <div class="post-wrapper">
        <div class="post-new padding">
          <router-link
            :to="`/profile/handle/${post.name}`">
            <div>
              <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
            </div>
            <span>{{ post.name }}</span>
          </router-link>
        </div>
        <div class="post-wrapper">
          <div class="post">
            <div class="post-author">
              <div class="groups-photo">
                <p>{{ post.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostHeader from '../helpers/PostsHeader';

export default {
  name: 'Post',
  created() {
    this.getPostById(this.$route.params.id);
  },
  computed: {
    ...mapState('posts', ['post']),
  },
  methods: {
    ...mapActions("posts", ['getPostById']),
  },
  components: {
    PostHeader
  }
}
</script>

<style>

</style>