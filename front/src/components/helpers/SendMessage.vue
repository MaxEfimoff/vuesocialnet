<template>
  <div>
    <form @submit.prevent="onSubmit" class="message-new-form">
        <div class="posts"> 
          <h2 class="padding">Send message</h2>
          <textarea
            class="textarea"
            placeholder="Send a message"
            :value="formData.text"
            @change="onChange('text', $event.target.value)"
          />
          <div class="error-message">
            {{this.errors.text}}
          </div>
          <div class="padding">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SendMessageForm',
  props: {
    formData: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile']),
  },
  methods: {
    onChange(prop, newValue) {
      const newData = Object.assign({}, this.formData);
      newData[prop] = prop === 'number' ? Number(newValue) : newValue;

      this.$emit('change', newData);
    },
  }
}
</script>

<style>

</style>