<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <GroupPost />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import GroupPost from '@/components/Group/GroupPost.vue';

export default {
  components: {
    Header,
    LeftSection,
    GroupPost
  }
}
</script>

<style>

</style>