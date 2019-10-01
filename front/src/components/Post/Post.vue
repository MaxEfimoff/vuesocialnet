<template>
  <section class="section-center">
    <div class="section posts">
      <PostHeader />
      <div class="post-wrapper">
        <div class="post-new padding">
          <router-link
            :to="`/profile/handle/${post.name}`">
            <div>
              <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
            </div>
            <span>{{ post.name }}</span>
          </router-link>
        </div>
        <div class="post-wrapper">
          <div class="post">
            <div class="post-author">
              <div class="groups-photo">
                <p>{{ post.text }}</p>
              </div>
            </div>
            <i class="fas fa-thumbs-up" @click="addLike"></i>{{' '}}<span>{{ post.likes.length }}</span>
            <div class="error-message">
              {{this.errors.alreadyliked}}
            </div>
          </div>
        </div>
        <!-- Comments -->
        <div
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
        </div>
        <!-- Comments form -->
        <form ref="text" @submit.prevent="submitForm" class="post-new-form">
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
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostHeader from '../helpers/PostsHeader';

export default {
  name: 'Post',
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
    this.getPostById(this.$route.params.id);
  },
  computed: {
    ...mapState('posts', ['post']),
    ...mapState('errors', ['errors']),
  },
  methods: {
    ...mapActions("posts", ['getPostById']),
    addLike() {
      this.$store.dispatch('posts/addLike', this.$route.params.id)
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
  components: {
    PostHeader
  }
}
</script>

<style>

</style>