<template>
  <div class="flex">
    <div v-for="product in products.slice(0, 10)" :key="product.id">
      <ProductCard
        :name="product.name"
        :image="product.image"
        :address="`/products/${product._id}`"
        :text="product.text"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/Product/ProductCard';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';

export default {
  name: 'Products',
  created() {
    this.getProducts();
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
    NoProfileMessage
  }
}
</script>