<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <ProductsMain />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import ProductsMain from '@/components/Products/ProductsMain.vue';

export default {
  components: {
    Header,
    LeftSection,
    ProductsMain
  }
}
</script>

<style>

</style>