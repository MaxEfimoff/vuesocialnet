<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Products />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Products from '@/components/Products/ProductsMain.vue';

export default {
  components: {
    Header,
    LeftSection,
    Products
  }
}
</script>

<style>

</style>