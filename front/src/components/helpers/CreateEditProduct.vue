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
      <select
        :value="formData.category ? formData.category._id : null"
        @change="onChange('category', $event.target.value)">
        <option value='default'>Select Category</option>
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.name }}
        </option>
      </select>
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
      {{this.errors.price}}
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
      {{this.errors.discountedPrice}}
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CreateEditProductForm',
  async mounted() {
    await this.getCategories();
  },
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
    ...mapState('profile', ['profile']),
    ...mapState('categories', ['categories']),
  },
  methods: {
    ...mapActions("categories", [ 'getCategories' ]),
    onChange(prop, newValue) {
      if(prop === 'category') {
        return this.emitCategory(newValue)
      }

      const newData = Object.assign({}, this.formData);

      newData[prop] = prop === ('price' || 'discountedPrice') ? Number(newValue) : newValue;

      this.$emit('change', newData);
    },
    emitCategory(categoryId) {
      const foundCategory = this.categories.find(c => c._id == categoryId);
      this.formData.category = foundCategory;
      const newData = Object.assign({}, this.formData);
      this.$emit('change', newData);
    }
  }
}
</script>

<style>

</style>