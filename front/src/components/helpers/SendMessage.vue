<template>
  <div>
    <form @submit.prevent="onSubmit" class="post-new-form">
        <div class="halfpadding"> 
          <input
            type="text"
            placeholder="Send a message"
            :value="formData.text"
            @change="onChange('text', $event.target.value)"
          />
          <input
            type="text"
            :value="this.$store.state.profile.profile.handle"
            @change="onChange('text', $event.target.value)"
          />
          <input
            type="text"
            :value="this.$store.state.profile.anotherUserProfile.user.name"
            @change="onChange('text', $event.target.value)"
          />
        </div>
        <div class="error-message">
          {{this.errors.text}}
        </div>
        <div class="padding">
          <button type="submit">Submit</button>
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