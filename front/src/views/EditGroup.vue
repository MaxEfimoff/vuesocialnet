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
                :formData="currentGroup"
                :onSubmit="editGroup"
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
import CreateEditGroup from'@/components/helpers/CreateEditGroup.vue'

export default {
  name: 'EditGroup',
  mounted() {
    this.getGroup(this.$route.params.id);
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('groups', ['group']),
    currentGroup() {
      return this.group;
    },
  },
  methods: {
    ...mapActions("groups", ['getGroup']),
    onChange(newFormData) {
      this.$store.commit('groups/SET_GROUP', newFormData);
    },
    editGroup() {
      const group = Object.assign({}, this.group, {
      });
      this.$store.dispatch('groups/updateGroup', group)
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
