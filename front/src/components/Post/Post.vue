<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-wrapper">
        <div class="post-new padding">
          <router-link
            :to="`/profile/handle/${post.name}`" class="flex">
            <div>
              <img class="groups-img" :src="post.avatar" alt="">
            </div>
            <div class="leftpadding">
              <span>{{ post.name }}</span>
            <div>
              <span>{{ post.date | formatDate }}</span>
            </div>
            </div>
          </router-link>
        </div>
        <div class="post-wrapper">
          <div class="post">
            <div class="post-author">
              <div class="groups-photo">
                <p>{{ post.text }}</p>
              </div>
            </div>
            <i class="fas fa-thumbs-up" @click="addLike"></i>{{' '}}<span>{{ post.likes ? post.likes.length : '0' }}</span>
            <router-link class="padding" :to="`/posts/${post._id}/edit-post`">
              <span v-if="this.postAuthor" class="halfpadding">Edit post</span>
            </router-link>
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
              <router-link
                :to="`/profile/handle/${comment.name}`">
                <img class="groups-img" :src="comment.avatar" alt="">
                <div class='text-center'>
                  <span>{{ comment.name }}</span>
                </div>
              </router-link>
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
        <!-- Comments form -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Post',
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        avatar: this.$store.state.profile.profile.avatar
      },
      tab: 'text',
    };
  },
  created() {
    this.getPostById(this.$route.params.id);
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('posts', ['post']),
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile' ]),
    postAuthor() {
      return this.$store.state.posts.post.name === this.$store.state.profile.profile.handle;
    }
  },
  methods: {
    ...mapActions("posts", ['getPostById']),
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
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
}
</script>

<style>

</style>