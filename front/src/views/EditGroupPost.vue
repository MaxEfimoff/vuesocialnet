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
  name: 'EditGroupPost',
  mounted() {
    this.getGroupPost(this.$route.params.id);
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('groups', ['grouppost', 'group']),
    currentPost() {
      return this.grouppost;
    },
  },
  methods: {
    ...mapActions("groups", ['getGroupPost', 'getGroup']),
    onChange(newFormData) {
      this.$store.commit('groups/SET_GROUP_POST', newFormData);
    },
    editPost() {
      const post = Object.assign({}, this.post, {
      });
      const payload = {
        id: this.$route.params.id,
        groupid: this.$route.params.groupid,
        newFormData: newFormData
      }
      this.$store.dispatch('groups/updateGroupPost', payload)
        .then(() => this.$router.push({ name: 'groups' }))
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
