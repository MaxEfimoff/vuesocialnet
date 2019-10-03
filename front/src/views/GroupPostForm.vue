<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <GroupPostForm />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import GroupPostForm from '@/components/Group/GroupPostForm.vue';

export default {
  components: {
    Header,
    LeftSection,
    GroupPostForm
  }
}
</script>

<style>

</style>