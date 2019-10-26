<template>
  <div>
    <button href="" @click.prevent="show">Add new product</button>
    <modal name="ModalProduct">
      <ProductForm />
    </modal>
  </div>
</template>

<script>
import ProductForm from '../Product/ProductForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalProduct');
    },
    hide() {
      this.$modal.hide('ModalProduct');
    }
  },
  components: {
    ProductForm
  }
}
</script>

<style>

</style>