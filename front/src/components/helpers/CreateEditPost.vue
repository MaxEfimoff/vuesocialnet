<template>
<div>
  <form @submit.prevent="onSubmit" class="post-new-form">
    <div class="halfpadding">
      <textarea
        class="textarea"
        type="text"
        placeholder="Write something!"
        ref="text"
        :value="formData.text"
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
  name: 'CreateEditPostForm',
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
    ...mapState('posts', [ 'post']),
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