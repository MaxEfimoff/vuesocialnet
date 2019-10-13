<template>
  <div>
    <button href="" @click.prevent="show">Add new photo</button>
    <modal name="ModalPhoto">
      <PhotoForm />
    </modal>
  </div>
</template>

<script>
import PhotoForm from '../Photo/PhotoForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalPhoto');
    },
    hide() {
      this.$modal.hide('ModalPhoto');
    }
  },
  components: {
    PhotoForm
  }
}
</script>

<style>

</style>