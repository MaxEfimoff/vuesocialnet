<template>
  <div class="flex">
    <div v-for="product in products.slice(0, 10)" :key="product.id">
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
  name: 'Products',
  async mounted() {
    await this.getProducts();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('products', ['products']),
  },
  methods: {
    ...mapActions("products", ['getProducts']),
  },
  components: {
    ProductCard,
  }
}
</script>