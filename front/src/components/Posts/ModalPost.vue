<template>
  <div>
    <button href="" @click.prevent="show">Add new post</button>
    <modal name="ModalPost">
      <PostForm />
    </modal>
  </div>
</template>

<script>
import PostForm from '../Post/PostForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalPost');
    },
    hide() {
      this.$modal.hide('ModalPost');
    }
  },
  components: {
    PostForm
  }
}
</script>

<style>

</style>