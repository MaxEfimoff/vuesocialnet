<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <FriendsProducts />
      </div>
    </div>
  </div> 
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import FriendsProducts from '@/components/Products/FriendsProducts.vue';

export default {
  components: {
    Header,
    LeftSection,
    FriendsProducts
  }
}
</script>

<style>

</style>