<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <GroupForm />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import GroupForm from '@/components/Group/GroupForm.vue';

export default {
  components: {
    Header,
    LeftSection,
    GroupForm
  }
}
</script>

<style>

</style>