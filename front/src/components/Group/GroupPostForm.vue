<template>
  <section class="section posts">
    <h2 class="padding">Group Post Form</h2>
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
    onChange(newFormData) {
      this.formData = newFormData;
    },
    createPost() {
      const payload = {
        id: this.$store.state.groups.group._id,
        formData: this.formData
      }
      this.$store.dispatch('groups/createGroupPost', payload)
      .then(() => this.$router.push({ name: 'groups' }))
      .catch((error) => {console.log(error)
      })
    },
  },
  components: {
    CreateEditPost
  }
}
</script>

<style>

</style>