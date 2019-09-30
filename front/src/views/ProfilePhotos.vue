<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <ProfilePhotos />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import ProfilePhotos from '@/components/Profile/ProfilePhotos.vue';

export default {
  components: {
    Header,
    LeftSection,
    ProfilePhotos
  }
}
</script>

<style>

</style>