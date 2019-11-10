<template>
  <form>
    <div class="field">
      <label class="title m-b-sm">Choose Title</label>
      <input
        @input="emitFormData"
        @blur="$v.formData.title.$touch()"
        v-model="formData.title"
        class="input"
        type="text"
        placeholder="Enter Title">
      <div v-if="$v.formData.title.$error">
        <span v-if="!$v.formData.title.required" class="error-message">Title is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Starts At</label>
      <input
        @input="emitFormData"
        @blur="$v.formData.startDate.$touch()"
        v-model="formData.startDate"
        class="input"
        type="text"
        placeholder="Starts At">
      <div v-if="$v.formData.startDate.$error">
        <span v-if="!$v.formData.startDate.required" class="error-message">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <input
        @input="emitFormData"
        @blur="$v.formData.timeFrom.$touch()"
        v-model="formData.timeFrom"
        class="input"
        type="text"
        placeholder="Time From">
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <input
        @input="emitFormData"
        @blur="$v.formData.timeTo.$touch()"
        v-model="formData.timeTo"
        class="input"
        type="text"
        placeholder="Time to">
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <select
            v-model="formData.category"
            @blur="$v.formData.category.$touch()"
            @change="emitFormData">
            <option 
              v-for="category of eventcategories"
              :value="category"
              :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div v-if="$v.formData.category.$error">
          <span v-if="!$v.formData.category.required" class="error-message">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import { mapState, mapActions } from 'vuex';

  export default {
    data () {
      return {
        formData: {
          title: null,
          startDate: null,
          timeTo: null,
          timeFrom: null,
          category: null
        }
      }
    },
    async mounted() {
      await this.getEventCategories();
    },
    validations: {
      formData: {
        title: { required },
        startDate: { required },
        category: { required },
        timeTo: { required },
        timeFrom: { required }
      }
    },
    computed: {
      ...mapState('eventcategories', ['eventcategories']),
    },
    methods: {
      ...mapActions("eventcategories", [ 'getEventCategories' ]),
      emitFormData() {
        this.$emit('stepUpdated', { data: this.formData, isValid: !this.$v.$invalid })
      }
    }
  }
</script>

<style scoped>
  .time-picker {
    display: block;
  }
</style>