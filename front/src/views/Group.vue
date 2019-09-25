<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Group />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Group from '@/components/Group/Group.vue';

export default {
  components: {
    Header,
    LeftSection,
    Group
  }
}
</script>

<style>

</style>