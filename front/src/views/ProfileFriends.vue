<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <ProfileFriends />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import ProfileFriends from '@/components/Profile/ProfileFriends.vue';

export default {
  components: {
    Header,
    LeftSection,
    ProfileFriends
  }
}
</script>

<style>

</style>