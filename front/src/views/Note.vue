<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Note />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Note from '@/components/Note/Note.vue';

export default {
  components: {
    Header,
    LeftSection,
    Note
  }
}
</script>

<style>

</style>