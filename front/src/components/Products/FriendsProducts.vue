<template>
  <div class="flex">
    <div v-for="product in friendsproducts.slice(0, 10)" :key="product.id">
      <ProductCard 
        :name="product.name"
        :avatar="product.avatar"
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
  name: 'FriendsProducts',
  created() {
    this.getFriendsProducts();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('products', ['friendsproducts']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions("products", ['getFriendsProducts']),
  },
  components: {
    ProductCard
  }
}
</script>
