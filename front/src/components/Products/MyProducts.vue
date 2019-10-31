<template>
  <div  class="flex">
    <div v-for="product in myproducts" :key="product.id">
      <ProductCard
        :name="product.profile.handle"
        :image="product.image"
        :address="`/products/${product._id}`"
        :text="product.text"
        :price="product.price"
        :discountedPrice="product.discountedPrice"
        :date="product.date"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/Product/ProductCard';

export default {
  name: 'MyProducts',
  async mounted() {
    await this.getMyProducts();
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
