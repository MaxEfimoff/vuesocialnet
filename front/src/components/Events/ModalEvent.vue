<template>
  <div>
    <button href="" @click.prevent="show">Add new event</button>
    <modal name="ModalCreateEvent" height="auto">
      <EventForm @closeModal="hide"/>
    </modal>
  </div>
</template>

<script>
import EventForm from '@/components/Event/EventForm.vue';
export default {
  methods: {
    show() {
      this.$modal.show('ModalCreateEvent');
    },
    hide() {
      this.$modal.hide('ModalCreateEvent');
    }
  },
  components: {
    EventForm
  }
}
</script>

<style>

</style>