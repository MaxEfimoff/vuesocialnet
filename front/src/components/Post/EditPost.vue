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
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue';
import CreateEditPost from'@/components/helpers/CreateEditPost.vue'

export default {
  name: 'EditPost',
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('posts', [ 'post']),
    currentPost() {
      return this.post;
    }
  },
  methods: {
    onChange(newFormData) {
      this.$store.commit('posts/SET_POST', newFormData);
    },
    editPost() {
      const payload = {
        id: this.$route.params.id,
        newFormData: newFormData
      }
      this.$store.dispatch('posts/updatePost', payload)
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
