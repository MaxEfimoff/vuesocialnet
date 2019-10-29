<template>
  <section class="posts">
    <div class="section posts">
      <h2 class="padding">Product Form</h2>
      <CreateEditProduct
        :formData="formData"
        :onSubmit="createProduct"
        @change="onChange"
      />
    </div>
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
        category: null,
        price: null,
        discountedPrice: null,
        image: '',
        name: this.$store.state.profile.profile.handle,
        profile: this.$store.state.profile.profile._id,
      },
    };
  },
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('errors', [ 'errors' ]),
    ...mapState('profile', [ 'profile' ])
  },
  methods: {
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    createProduct() {
      this.$store.dispatch('products/addProduct', this.formData)
      .then(() => this.$router.push({ name: 'products' }))
      .catch((error) => {console.log(error)
      })
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