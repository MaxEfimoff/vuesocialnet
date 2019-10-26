<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Product />
      </div>
    </div>
  </div>  
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Product from '@/components/Product/Product.vue';

export default {
  components: {
    Header,
    LeftSection,
    Product
  }
}
</script>

<style>

</style>