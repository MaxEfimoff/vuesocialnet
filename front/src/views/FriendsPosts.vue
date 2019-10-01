<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <FriendsPosts />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import FriendsPosts from '@/components/Posts/FriendsPosts.vue';

export default {
  components: {
    Header,
    LeftSection,
    FriendsPosts
  }
}
</script>

<style>

</style>