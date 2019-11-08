<template>
  <section class="posts">
    <h2 class="padding">Post Form</h2>
    <CreateEditPost
      :formData="formData"
      :onSubmit="createPost"
      @change="onChange"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateEditPost from'@/components/helpers/CreateEditPost.vue';

export default {
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        profile: this.$store.state.profile.profile._id,
        avatar: this.$store.state.profile.profile.avatar
      },
    };
  },
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('errors', [ 'errors' ]),
    ...mapState('profile', [ 'profile' ])
  },
  methods: {
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    createPost() {
      this.$store.dispatch('posts/addPost', this.formData)
      .catch((error) => {console.log(error)
      })
      
      this.$emit('closeModal');
    },
    onChange(newFormData) {
      this.formData = newFormData;
    },
  },
  components: {
    CreateEditPost
  }
}
</script>

<style>

</style>