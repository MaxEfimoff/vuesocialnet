<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Photos />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Photos from '@/components/Photos/Photos.vue';

export default {
  components: {
    Header,
    LeftSection,
    Photos
  }
}
</script>
