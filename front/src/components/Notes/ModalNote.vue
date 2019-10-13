<template>
  <div>
    <button href="" @click.prevent="show">Add new note</button>
    <modal name="ModalNote">
      <NoteForm />
    </modal>
  </div>
</template>

<script>
import NoteForm from '../Note/NoteForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalNote');
    },
    hide() {
      this.$modal.hide('ModalNote');
    }
  },
  components: {
    NoteForm
  }
}
</script>

<style>

</style>