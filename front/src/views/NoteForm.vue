<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <NoteForm />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import NoteForm from '@/components/Note/NoteForm.vue';

export default {
  components: {
    Header,
    LeftSection,
    NoteForm
  }
}
</script>

<style>

</style>