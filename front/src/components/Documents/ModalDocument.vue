<template>
  <div>
    <button href="" @click.prevent="show">Add new document</button>
    <modal name="ModalDocument">
      <DocumentForm />
    </modal>
  </div>
</template>

<script>
import DocumentForm from '../Document/DocumentForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalDocument');
    },
    hide() {
      this.$modal.hide('ModalDocument');
    }
  },
  components: {
    DocumentForm
  }
}
</script>

<style>

</style>