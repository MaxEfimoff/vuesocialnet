<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Profiles />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Profiles from '@/components/Profiles/Profiles.vue';

export default {
  components: {
    Header,
    LeftSection,
    Profiles
  }
}
</script>

<style>

</style>