<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <DocumentForm />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import DocumentForm from '@/components/Document/DocumentForm.vue';

export default {
  components: {
    Header,
    LeftSection,
    DocumentForm
  }
}
</script>

<style>

</style>