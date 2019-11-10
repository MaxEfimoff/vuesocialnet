<template>
  <div>
    <h1 class="title m-b-sm">What's your new Event location?</h1>
    <div class="m-b-lg">
      <span class="subtitle">New York, US</span>
      <a>(change location)</a>
      <input
        @input="emitFormData"
        @blur="$v.formData.location.$touch()"
        v-model="formData.location"
        type="text"
        class="input">
      <div v-if="$v.formData.location.$error">
        <span v-if="!$v.formData.location.required" class="error-message">Location is required</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
         formData: {
           location: null
        }
      }
    },
    validations: {
      formData: {
        location: {
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