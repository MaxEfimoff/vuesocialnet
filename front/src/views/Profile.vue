<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Profile />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Profile from '@/components/Profile/Profile.vue';

export default {
  components: {
    Header,
    LeftSection,
    Profile
  }
}
</script>

<style>

</style>