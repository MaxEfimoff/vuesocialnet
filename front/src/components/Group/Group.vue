<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <h3>{{ group.handle }}</h3>
      </div>
      <div class="post-new padding">
        <h4>{{ group.status }}</h4>
        <span>{{ group.info }}</span>
      </div>
      <div class="flex">
        <div class="padding" v-if="!this.alreadySubscribed && !this.groupAdministrator">
          <button 
            type="submit"
            @click="subscribe"
          >
            Subscribe
          </button>
        </div>
        <div class="padding" v-else>
          <button 
            type="submit"
            @click="unsubscribe"
          >
            Unsubscribe
          </button>
        </div>
        <div v-if="this.groupAdministrator">
          <router-link :to="`/groups/${group._id}/post`">
            <button>
              New Post
            </button>
          </router-link>
        </div>
        </div>
        <!-- Posts -->
        <div class="post-wrapper">
          <div class="post" v-for="post in group.posts.slice(0, 10)" :key="post.id">
            <div class="flex-left">
              <router-link
                :to="`/profile/handle/${post.name}`">
                <div>
                  <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
                  <div class='text-center'>
                    <span>{{ post.name }}</span>
                  </div>
                </div>
              </router-link>
              <router-link
                :to="`${group._id}/posts/${post._id}`"
              >
              <div class="leftmargin">
                <span>{{ post.text }}</span>
              </div>
              </router-link>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  created() {
    this.getGroup(this.$route.params.id);
  },
  computed: {
    ...mapState('groups', ['group']),
    ...mapState('errors', ['errors']),
    alreadySubscribed() {
      const subscribers = this.$store.state.groups.group.subscribes;
      if (subscribers.some(e => e.user === this.$store.state.auth.user.id)) {
        return true;
      }
    },
    groupAdministrator() {
      if (this.$store.state.groups.group.user === this.$store.state.auth.user.id) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions("groups", ['getGroup']),
    subscribe() {
      const id = this.$store.state.groups.group._id;
      this.$store.dispatch('groups/subscribe', id)
      .catch((error) => console.log(error))
    },
    unsubscribe() {
      const id = this.$store.state.groups.group._id;
      this.$store.dispatch('groups/unsubscribe', id)
      .catch((error) => console.log(error))
    },
  },
}
</script>

<style>

</style>