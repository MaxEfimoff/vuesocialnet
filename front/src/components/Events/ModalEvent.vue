<template>
  <div>
    <button href="" @click.prevent="show">Add new event</button>
    <modal name="ModalEvent" height="auto">
      <EventForm @closeModal="hide"/>
    </modal>
  </div>
</template>

<script>
import EventForm from '@/components/Event/EventForm.vue';
export default {
  methods: {
    show() {
      this.$modal.show('ModalEvent');
    },
    hide() {
      this.$modal.hide('ModalEvent');
    }
  },
  components: {
    EventForm
  }
}
</script>

<style>

</style>