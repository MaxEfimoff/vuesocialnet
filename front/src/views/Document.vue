<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Document />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Document from '@/components/Document/Document.vue';

export default {
  components: {
    Header,
    LeftSection,
    Document
  }
}
</script>

<style>

</style>