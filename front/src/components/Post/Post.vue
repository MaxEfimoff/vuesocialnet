<template>
<div>
  <h3>Post Item</h3>
  <p>{{ post.text }}</p>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
}
</script>

<style>

</style>