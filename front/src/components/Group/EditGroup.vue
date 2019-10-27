<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <div class="section-center">
          <section class="section posts">
            <h3 class="padding">Edit Group</h3>
              <CreateEditGroup
                :formData="formData"
                :onSubmit="createGroup"
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
import CreateEditGroup from'@/components/helpers/CreateEditGroup.vue'

export default {
  name: 'EditGroup',
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile']),
    currentProfile() {
      return this.profile;
    },
  },
  methods: {
    onChange(newFormData) {
      this.$store.commit('groups/SET_GROUP', newFormData);
    },
    editPage() {
      const profile = Object.assign({}, this.profile, {
      });
      this.$store.dispatch('groups/updateGroup', profile)
        .then(() => this.$router.push({ name: 'groups' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    Header,
    CreateEditGroup,
    LeftSection
  }
};
</script>

<style>
</style>
