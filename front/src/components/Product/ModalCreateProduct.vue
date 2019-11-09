<template>
  <div>
    <button href="" @click.prevent="show">Add new product</button>
    <modal name="ModalCreateProduct" height="auto">
      <ProductForm @closeModal="hide"/>
    </modal>
  </div>
</template>

<script>
import ProductForm from '@/components/Product/ProductForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalCreateProduct');
    },
    hide() {
      this.$modal.hide('ModalCreateProduct');
    }
  },
  components: {
    ProductForm
  }
}
</script>

<style>

</style>