<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Events />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Events from '@/components/Events/Events.vue';

export default {
  components: {
    Header,
    LeftSection,
    Events
  }
}
</script>

<style>

</style>