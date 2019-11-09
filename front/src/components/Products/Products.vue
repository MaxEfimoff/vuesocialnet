<template>
  <div class="flex">
    <div @click.prevent="show(product._id)" v-for="product in products" :key="product.id">
      <ProductCard
        :name="product.profile.handle"
        :image="product.image"
        :text="product.text"
        :price="product.price"
        :discountedPrice="product.discountedPrice"
        :date="product.date"
        @closeModal="hide"/>
    </div>
    <modal name="ModalProduct" height="auto">
      <Product :id="productId" />
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/Product/ProductCard';
import Product from '@/components/Product/Product';

export default {
  data() {
    return {
      productId: ''
    }
  },
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
    show(arg) {
      this.$modal.show('ModalProduct', {id: arg});
      this.productId = arg;
    },
    hide() {
      this.$modal.hide('ModalProduct');
    }
  },
  components: {
    ProductCard,
    Product
  }
}
</script>