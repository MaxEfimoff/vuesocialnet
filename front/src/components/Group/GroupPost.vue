<template>
  <section class="section-center">
    <div class="section posts">
      <div>
        <img :src="group.avatar" alt="" class="group-avatar">
      </div>
      <div class="halfpadding">
        <h3>{{ group.handle }}</h3>
        <h4>{{ group.status }}</h4>
        <span>{{ group.info }}</span>
      </div>
      <div class="post-wrapper">
        <div class="post-new padding">
          <router-link
            :to="`/profile/handle/${grouppost.name}`"
            class="flex">
            <div>
              <img class="groups-img" :src="grouppost.avatar" alt="">
            </div>
            <div class="leftpadding">
              <span>{{ grouppost.name }}</span>
            <div>
              <span>{{ grouppost.date | formatDate }}</span>
            </div>
            </div>
          </router-link>
        </div>
        <div class="post-wrapper">
          <div class="post">
            <div class="post-author">
              <div class="groups-photo">
                <p>{{ grouppost.text }}</p>
              </div>
            </div>
            <i class="fas fa-thumbs-up" @click="addLike"></i>{{' '}}<span>{{ grouppost.likes ? grouppost.likes.length : '0' }}</span>
            <router-link
              v-if="this.postAuthor"
              class="padding" 
              :to="`${grouppost._id}/edit-post`"
              
            >
              <!-- :to="{ name: 'editGroupPost', params: { id: grouppost._id, groupid:  } }" -->
              <span class="halfpadding">Edit post</span>
            </router-link>
            <div class="error-message">
              {{this.errors.alreadyliked}}
            </div>
          </div>
        </div>
        <!-- Comments -->
        <div
          class="message"
          v-for="comment in grouppost.comments"
          :key="comment.id"
        >
          <div class="flex-left-nowrap">
             <div>
              <img class="groups-img" :src="comment.avatar" alt="">
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

export default {
  name: 'Grouppost',
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
    const payload = {
      post_id: this.$route.params.id,
      id: this.$store.state.groups.group._id
    }
    this.getGroupPost(payload);
  },
  computed: {
    ...mapState('groups', ['grouppost', 'group']),
    ...mapState('errors', ['errors']),
    postAuthor() {
      return this.$store.state.groups.grouppost.name === this.$store.state.profile.profile.handle;
    }
  },
  methods: {
    ...mapActions("groups", ['getGroupPost', 'getGroup']),
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
        post_id: this.$route.params.id,
        id: this.$store.state.groups.group._id,
        formData: this.formData
      }
      this.$store.dispatch('groups/addPostComment', payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)})
    },
  },
}
</script>

<style>

</style>