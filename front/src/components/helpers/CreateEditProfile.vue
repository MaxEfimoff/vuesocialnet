<template>
<div>
  <form @submit.prevent="onSubmit" class="post-new-form">
    <div class="halfpadding">
      <input
        type="text"
        placeholder="Handle"
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
        placeholder="Company"
        ref="company"
        :value="formData.company"
        @change="onChange('company', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.company}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        ref="website"
        placeholder="Website"
        :value="formData.website"
        @change="onChange('website', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.website}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Location"
        ref="location"
        :value="formData.location"
        @change="onChange('location', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.location}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Status"
        ref="status"
        :value="formData.status"
        @change="onChange('status', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.status}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Bio"
        ref="bio"
        :value="formData.bio"
        @change="onChange('bio', $event.target.value)"
      >
    </div>
    <div class="error-message">
      {{this.errors.bio}}
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
  name: 'CreateEditProfileForm',
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