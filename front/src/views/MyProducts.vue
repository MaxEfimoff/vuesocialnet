<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <MyProducts />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import MyProducts from '@/components/Products/MyProducts.vue';

export default {
  components: {
    Header,
    LeftSection,
    MyProducts
  }
}
</script>

<style>

</style>