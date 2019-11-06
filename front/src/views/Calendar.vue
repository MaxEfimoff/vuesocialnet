<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Calendar />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Calendar from '@/components/Calendar/Calendar.vue';

export default {
  components: {
    Header,
    LeftSection,
    Calendar
  }
}
</script>
