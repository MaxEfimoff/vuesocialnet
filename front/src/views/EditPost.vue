<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <div class="section-center">
          <section class="section posts">
            <h3 class="padding">Edit Post</h3>
              <CreateEditPost
                :formData="currentPost"
                :onSubmit="editPost"
                @change="onChange"
              />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue';
import CreateEditPost from'@/components/helpers/CreateEditPost.vue'

export default {
  name: 'EditPost',
  mounted() {
    this.getPostById(this.$route.params.id);
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('posts', ['post']),
    currentPost() {
      return this.post;
    },
  },
  methods: {
    ...mapActions("posts", ['getPostById']),
    onChange(newFormData) {
      this.$store.commit('posts/SET_POST', newFormData);
    },
    editPost() {
      const post = Object.assign({}, this.post, {
      });
      this.$store.dispatch('posts/updatePost', post)
        .then(() => this.$router.push({ name: 'posts' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    Header,
    CreateEditPost,
    LeftSection
  }
};
</script>

<style>
</style>
