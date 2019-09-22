<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <PostForm />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import PostForm from '@/components/Post/PostForm.vue';

export default {
  components: {
    Header,
    LeftSection,
    PostForm
  }
}
</script>

<style>

</style>