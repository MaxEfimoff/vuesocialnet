<template>
  <div  class="flex">
    <div
      @click.prevent="show(product._id)"
      v-for="product in myproducts"
      :key="product.id">
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
  name: 'MyProducts',
  data() {
    return {
      productId: ''
    }
  },
  async mounted() {
    await this.getMyProducts();
    await this.hide();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('products', ['myproducts']),
  },
  methods: {
    ...mapActions("products", ['getMyProducts']),
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
