<template>
  <div>
    <section class="section-center" v-if="this.profile.handle">
      <div class="post-wrapper">
        <div class="post" v-for="product in friendsproducts.slice(0, 10)" :key="product.id">
          <ProductCard 
            :name="product.name"
            :avatar="product.avatar"
            :address="`/products/${product._id}`"
            :text="product.text"/>
        </div>
      </div>
    </section>
    <section v-else class="register">
      <NoProfileMessage />
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/Product/ProductCard';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';

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
    NoProfileMessage,
    ProductCard
  }
}
</script>
