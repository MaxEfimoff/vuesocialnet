<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Notes />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Notes from '@/components/Notes/Notes.vue';

export default {
  components: {
    Header,
    LeftSection,
    Notes
  }
}
</script>
