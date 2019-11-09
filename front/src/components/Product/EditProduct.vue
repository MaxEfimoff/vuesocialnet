<template>
  <section class="posts">
    <h3 class="padding">Edit Product</h3>
      <CreateEditProduct
        :formData="currentProduct"
        :onSubmit="editProduct"
        @change="onChange"
      />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue';
import CreateEditProduct from'@/components/helpers/CreateEditProduct.vue'

export default {
  name: 'EditPost',
  props: {
    id: {
      required: true,
      type: String
    },
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('product', [ 'product']),
    currentProduct() {
      return this.$store.state.products.product;
    },
  },
  created() {
    this.getProductById(this.id);
  },
  methods: {
    ...mapActions("products", ['getProductById']),
    onChange(FormData) {
      this.$store.commit('products/SET_PRODUCT', FormData);
    },
    editProduct() {
      // const payload = {
      //   id: this.id,
      //   FormData: FormData
      // }
      this.$emit('closeModal');
      this.$store.dispatch('products/updateProduct')
        .then(() => this.$router.push({ name: 'products' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    CreateEditProduct
  }
};
</script>

<style>
</style>
