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
  },
  methods: {
    ...mapActions("groups", ['getGroup']),
  },
}
</script>

<style>

</style>