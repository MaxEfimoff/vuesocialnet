<template>
  <div>
    <h1 class="title m-b-sm">What's your new Event location?</h1>
    <div class="m-b-lg">
      <span v-if="ipLocation && !wantChangeLocation" class="subtitle">{{ipLocation}}</span>
      <a v-if="ipLocation && !wantChangeLocation" @click="toggleLocation">(Change location)</a>
      <a v-if="ipLocation && wantChangeLocation" @click="toggleLocation">(Set default location)</a>
      <input
        v-if="!ipLocation || wantChangeLocation"
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
        wantChangeLocation: false,
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
    computed: {
      ipLocation() {
        return this.$store.getters['meta/setLocation'];
      }
    },
    methods: {
      emitFormData() {
        this.$emit('stepUpdated', { data: this.formData, isValid: !this.$v.$invalid })
      },
      toggleLocation() {
        if(this.ipLocation) {
          this.formData.location = this.ipLocation;
          this.emitFormData();
        }
        this.wantChangeLocation = !this.wantChangeLocation
      }
    },
    created() {
      if(this.ipLocation) {
        this.formData.location = this.ipLocation;
        this.emitFormData();
      }
    }
  }
</script>

<style scoped>