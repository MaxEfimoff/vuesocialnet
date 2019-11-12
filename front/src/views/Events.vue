<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <EventsMain />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import EventsMain from '@/components/Events/EventsMain.vue';

export default {
  components: {
    Header,
    LeftSection,
    EventsMain
  }
}
</script>

<style>

</style>