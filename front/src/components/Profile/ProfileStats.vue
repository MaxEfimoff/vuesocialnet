<template>
  <div class="stats">
    <router-link
      class="stat-counter"
      :to="`${anotherUserProfile.handle}/friends/`">
      <div class="count">
        <div v-if="anotherUserProfile.friends.length" class="white-font">{{ anotherUserProfile.friends.length }}</div>
        <div v-else class="white-font">0</div>
      </div>
      <i class="fas fa-user white-font"></i>
    </router-link>
    <router-link
      class="stat-counter lefthalfpadding"
      :to="`${anotherUserProfile.handle}/photos/`">
      <div class="count">
        <div v-if="profilePhotos.length" class="white-font">
          {{ profilePhotos.length }}
        </div>
        <div v-else class="white-font">
          0
        </div>
      </div>
      <i class="fas fa-camera white-font"></i>
    </router-link>
    <router-link
      class="stat-counter lefthalfpadding"
      :to="`${anotherUserProfile.handle}/groups/`">
      <div class="count">
        <div v-if="profileGroups.length" class="white-font">
          {{ profileGroups.length }}
        </div>
        <div v-else class="white-font">
          0
        </div>
      </div>
      <i class="fas fa-users white-font"></i>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.getProfilePhotos(this.$route.params.handle);
    this.getProfilePosts(this.$route.params.handle);
    this.getProfileByHandle(this.$route.params.handle);
    this.getProfileGroups(this.$route.params.handle);
  },
  computed: {
    ...mapState('profile', ['profiles','anotherUserProfile','profile', 'profilePhotos', 'profilePosts', 'profileGroups' ]),
  },
  methods: {
    ...mapActions("profile", ['getProfileByHandle', 'exportCurrentProfile', 'getProfilePhotos', 'getProfilePosts', 'getProfileGroups']),
  }
}
</script>

<style>

</style>