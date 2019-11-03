<template>
  <div>
    <section class="section-center" v-if="this.profile.handle">
      <div class="post-wrapper">
        <div class="post" v-for="post in posts.slice(0, 10)" :key="post.id">
          <PostCard
            :name="post.name"
            :avatar="post.avatar"
            :address="{ name: 'post', params: { id: post._id } }"
            :text="post.text"
            :date="post.date"/>
        </div>
      </div>
    </section>
    <section v-else class="register">
      <NoProfileMessage />
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostCard from '@/components/Post/PostCard';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';

export default {
  name: 'Posts',
  created() {
    this.getPosts();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('posts', ['posts']),
  },
  methods: {
    ...mapActions("posts", ['getPosts']),
  },
  components: {
    PostCard,
    NoProfileMessage
  }
}
</script>