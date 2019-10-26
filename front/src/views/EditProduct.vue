<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <div class="section-center">
          <section class="section posts">
            <h3 class="padding">Edit Product</h3>
              <CreateEditProduct
                :formData="currentProduct"
                :onSubmit="editProduct"
                @change="onChange"
              />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue';
import CreateEditProduct from'@/components/helpers/CreateEditProduct.vue'

export default {
  name: 'EditProduct',
  mounted() {
    this.getProductById(this.$route.params.id);
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('products', ['product']),
    currentProduct() {
      return this.product;
    },
  },
  methods: {
    ...mapActions("products", ['getProductById']),
    onChange(newFormData) {
      this.$store.commit('products/SET_PRODUCT', newFormData);
    },
    editProduct() {
      const product = Object.assign({}, this.product, {
      });
      this.$store.dispatch('products/updateProduct', product)
        .then(() => this.$router.push({ name: 'products' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    Header,
    CreateEditProduct,
    LeftSection
  }
};
</script>

<style>
</style>
