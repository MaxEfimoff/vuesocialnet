<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <EventEdit />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import EventEdit from '@/components/Event/EventEdit.vue';

export default {
  components: {
    Header,
    LeftSection,
    EventEdit
  }
}
</script>

<style>

</style>