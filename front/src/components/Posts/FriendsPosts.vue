<template>
  <div>
    <section class="section-center" v-if="this.profile.handle">
      <div class="post-wrapper">
        <div class="post" v-for="post in friendsposts.slice(0, 10)" :key="post.id">
          <div class="post-author">
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
              :to="`/posts/${post._id}`"
            >
            <div class="leftmargin">
              <span>{{ post.text }}</span>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="register">
      <div class="section posts padding">
        <h4>Welcome, {{ user.name }}! Please setup your profile!</h4>
        <div class="edit-profile">
          <router-link
            :to="{ name: 'createProfile' }">
            <!-- <img :src=" require (`${user.avatar}`) " alt=""> -->
            <span>Create profile</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PostHeader from '../helpers/PostsHeader';

export default {
  name: 'Posts',
  created() {
    this.getFriendsPosts();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('posts', ['friendsposts']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions("posts", ['getFriendsPosts']),
  },
  components: {
    PostHeader
  }
}
</script>
