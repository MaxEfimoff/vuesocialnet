<template>
  <div  class="flex">
    <div v-for="product in myproducts.slice(0, 10)" :key="product.id">
      <ProductCard
        :name="product.name"
        :image="product.image"
        :address="`/products/${product._id}`"
        :text="product.text"
        :date="product.date"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/Product/ProductCard';

export default {
  name: 'MyProducts',
  created() {
    this.getMyProducts();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('products', ['myproducts']),
  },
  methods: {
    ...mapActions("products", ['getMyProducts']),
  },
  components: {
    ProductCard,
  }
}
</script>
