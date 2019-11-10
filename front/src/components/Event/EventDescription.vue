<template>
  <form class="m-b-md">
    <div class="field">
      <label class="title">Image</label>
      <input
        @input="emitFormData"
        @blur="$v.formData.image.$touch()"
        v-model="formData.image"
        class="input"
        type="text"
        placeholder="Image URL">
      <div v-if="$v.formData.image.$error">
        <span v-if="!$v.formData.image.required" class="error-message">Username is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title">Additional Info</label>
      <textarea
        @input="emitFormData"
        @blur="$v.formData.shortInfo.$touch()"
        v-model="formData.shortInfo"
        class="textarea"
        placeholder="Write Short Info"
        rows="3"></textarea>
      <div v-if="$v.formData.shortInfo.$error">
        <span v-if="!$v.formData.shortInfo.required" class="error-message">Additional info is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title">Long Description</label>
      <textarea
        @input="emitFormData"
        @blur="$v.formData.description.$touch()"
        v-model="formData.description"
        class="textarea"
        placeholder="Write description"
        rows="10"></textarea>
        <div v-if="$v.formData.description.$error">
          <span v-if="!$v.formData.description.required" class="error-message">Description is required</span>
      </div>
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        formData: {
          image: null,
          shortInfo: null,
          description: null
        }
      }
    },
    validations: {
      formData: {
        image: {
          required
        },
        shortInfo: {
          required
        },
        description: {
          required
        }
      }
    },
    methods: {
      emitFormData() {
        this.$emit('stepUpdated', { data: this.formData, isValid: !this.$v.$invalid })
      }
    }
  }
</script>

<style scoped>
</style>