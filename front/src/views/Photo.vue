<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Photo />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Photo from '@/components/Photo/Photo.vue';

export default {
  components: {
    Header,
    LeftSection,
    Photo
  }
}
</script>

<style>

</style>