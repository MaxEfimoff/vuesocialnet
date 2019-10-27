<template>
<div>
  <form @submit.prevent="onSubmit" class="post-new-form">
    <div class="halfpadding">
      <input
        type="text"
        placeholder="Group handle"
        ref="handle"
        :value="formData.handle"
        @change="onChange('handle', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.handle}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Group status"
        ref="status"
        :value="formData.status"
        @change="onChange('status', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.status}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        ref="info"
        placeholder="Group info"
        :value="formData.info"
        @change="onChange('info', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.info}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Group avatar"
        ref="avatar"
        :value="formData.avatar"
        @change="onChange('avatar', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.avatar}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
       placeholder="Group background"
        ref="background"
        :value="formData.background"
        @change="onChange('background', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.background}}
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
  name: 'CreateEditGroupForm',
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