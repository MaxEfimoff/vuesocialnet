<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Event />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Event from '@/components/Event/Event.vue';

export default {
  components: {
    Header,
    LeftSection,
    Event
  }
}
</script>

<style>

</style>