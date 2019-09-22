<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Post />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Post from '@/components/Post/Post.vue';

export default {
  components: {
    Header,
    LeftSection,
    Post
  }
}
</script>

<style>

</style>