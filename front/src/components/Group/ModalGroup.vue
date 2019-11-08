<template>
  <div>
    <button href="" @click.prevent="show">Create new Group</button>
    <modal name="ModalGroup" height="auto">
      <GroupForm @closeModal="hide"/>
    </modal>
  </div>
</template>

<script>
import GroupForm from '../Group/GroupForm';
export default {
  methods: {
    show() {
      this.$modal.show('ModalGroup');
    },
    hide() {
      this.$modal.hide('ModalGroup');
    }
  },
  components: {
    GroupForm
  }
}
</script>

<style>

</style>