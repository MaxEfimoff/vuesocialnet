<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <MyPosts />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import MyPosts from '@/components/Posts/MyPosts.vue';

export default {
  components: {
    Header,
    LeftSection,
    MyPosts
  }
}
</script>

<style>

</style>