<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-wrapper">
        <div class="post-new padding">
          <router-link
            :to="`/profile/handle/${grouppost.name}`">
            <div>
              <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
            </div>
            <span>{{ grouppost.name }}</span>
          </router-link>
        </div>
        <div class="post-wrapper">
          <div class="post">
            <div class="post-author">
              <div class="groups-photo">
                <p>{{ grouppost.text }}</p>
              </div>
            </div>
            <i class="fas fa-thumbs-up" @click="addLike"></i>{{' '}}<span>{{ grouppost.likes.length }}</span>
            <div class="error-message">
              {{this.errors.alreadyliked}}
            </div>
          </div>
        </div>
        <!-- Comments -->
        <!-- <div
          class="message"
          v-for="comment in post.comments"
          :key="comment.id"
        >
          <div class="flex-left-nowrap">
             <div>
              <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
              <div class='text-center'>
                <span>{{ comment.name }}</span>
              </div>
            </div>
            <div class="groups-photo">
              <a class="leftpadding">{{ comment.text }}</a>
            </div>
          </div>
        </div> -->
        <!-- Comments form -->
        <!-- <form ref="text" @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <textarea
              class="textarea"
              placeholder="Coment"
              v-model="formData.text"
            />
          </div>
          <div class="padding">
            <button type="submit">Submit</button>
          </div>
        </form> -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Grouppost',
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.user.name,
        // avatar: this.$store.state.profile.profile.avatar
      },
      tab: 'text',
    };
  },
  created() {
    const payload = {
      post_id: this.$route.params.id,
      id: this.$store.state.groups.group._id
    }
    this.getGroupPost(payload);
  },
  computed: {
    ...mapState('groups', ['grouppost', 'group']),
    ...mapState('errors', ['errors']),
  },
  methods: {
    ...mapActions("groups", ['getGroupPost']),
    addLike() {
      const payload = {
      post_id: this.$route.params.id,
      id: this.$store.state.groups.group._id
    }
      this.$store.dispatch('groups/addGroupPostLike', payload)
      .catch((error) => {console.log(error)})
    },
    submitForm() {
      const payload = {
        postId: this.$route.params.id,
        formData: this.formData
      }
      this.$store.dispatch('posts/addComment', payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)})
    },
  },
}
</script>

<style>

</style>