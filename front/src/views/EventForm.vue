<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <EventForm />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import EventForm from '@/components/Event/EventForm.vue';

export default {
  components: {
    Header,
    LeftSection,
    EventForm
  }
}
</script>

<style>

</style>