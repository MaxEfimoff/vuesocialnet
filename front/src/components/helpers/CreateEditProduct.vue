<template>
<div>
  <form @submit.prevent="onSubmit" class="post-new-form">
    <div class="halfpadding">
      <input
        type="text"
        placeholder="Product image"
        ref="image"
        :value="formData.image"
        @change="onChange('image', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.image}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Product category"
        ref="category"
        :value="formData.category"
        @change="onChange('category', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.category}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Product price"
        ref="price"
        :value="formData.price"
        @change="onChange('price', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.category}}
    </div>

    <div class="halfpadding">
      <input
        type="text"
        placeholder="Product discounted price"
        ref="discountedPrice"
        :value="formData.discountedPrice"
        @change="onChange('discountedPrice', $event.target.value)"
      />
    </div>
    <div class="error-message">
      {{this.errors.category}}
    </div>

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
  name: 'CreateEditProductForm',
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