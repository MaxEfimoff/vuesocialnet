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
                :formData="formData"
                :onSubmit="editPage"
                @change="onChange"
              />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue';
import CreateEditProduct from'@/components/helpers/CreateEditProduct.vue'

export default {
  name: 'EditPost',
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('product', [ 'product']),
    currentProduct() {
      return this.product;
    },
  },
  methods: {
    onChange(newFormData) {
      this.$store.commit('products/SET_PRODUCT', newFormData);
    },
    editPage() {
      const payload = {
        id: this.$route.params.id,
        newFormData: newFormData
      }
      // const profile = Object.assign({}, this.profile, {
      // });
      this.$store.dispatch('products/updateProduct', payload)
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
