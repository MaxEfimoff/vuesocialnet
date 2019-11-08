<template>
  <section class="posts">
    <h2 class="padding">Product Form</h2>
    <CreateEditProduct
      :formData="formData"
      :onSubmit="createProduct"
      @change="onChange"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateEditProduct from'@/components/helpers/CreateEditProduct.vue';

export default {
  data() {
    return {
      formData: {
        text: '',
        category: 'default',
        price: null,
        discountedPrice: null,
        image: '',
        profile: this.$store.state.profile.profile._id
      },
    };
  },
  async mounted() {
    await this.exportCurrentProfile();
  },
  computed: {
    ...mapState('errors', [ 'errors' ]),
    ...mapState('profile', [ 'profile' ]),
  },
  methods: {
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    createProduct() {
      this.$store.dispatch('products/addProduct', this.formData)
      .then(() => this.$router.push({ name: 'products' }))
      .catch((error) => {console.log(error)
      })
      this.$emit('closeModal');
    },
    onChange(newFormData) {
      this.formData = newFormData;
    },
  },
  components: {
    CreateEditProduct
  }
}
</script>

<style>

</style>