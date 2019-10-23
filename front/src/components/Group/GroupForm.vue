<template>
  <section class="posts">
    <h2 class="padding">Group Form</h2>
    <CreateEditGroup
      :formData="formData"
      :onSubmit="createGroup"
      @change="onChange"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateEditGroup from'@/components/helpers/CreateEditGroup.vue';

export default {
  data() {
    return {
      formData: {
        handle: '',
        status: '',
        info: '',
        avatar: '',
        background: '',
        name: this.$store.state.profile.profile.handle,
        creatorAvatar: this.$store.state.profile.profile.avatar
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
    createGroup() {
      const newData = Object.assign({}, this.formData);

      this.$store.dispatch('groups/createGroup', newData)
        .then(() => this.$router.push({ name: 'groups' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    CreateEditGroup
  }
}
</script>

<style>

</style>