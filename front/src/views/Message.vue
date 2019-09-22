<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Message />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Message from '@/components/Message/Message.vue';

export default {
  components: {
    Header,
    LeftSection,
    Message
  }
}
</script>

<style>

</style>