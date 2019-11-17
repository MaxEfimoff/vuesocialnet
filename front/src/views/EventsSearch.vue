<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <EventsSearch />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import EventsSearch from '@/components/Events/EventsSearch.vue';

export default {
  components: {
    Header,
    LeftSection,
    EventsSearch
  }
}
</script>

<style>

</style>