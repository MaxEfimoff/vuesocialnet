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
      <label class="title m-b-sm">Start Date</label>
      <datepicker
        @input="setDate"
        :disabledDates="disabledDates"
        :value="formData.startDate">
      </datepicker>
      <div v-if="$v.formData.startDate.$error">
        <span v-if="!$v.formData.startDate.required" class="error-message">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <vue-timepicker
        @change="changeTime($event, 'timeFrom')"
        :minute-interval="10"></vue-timepicker>
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <vue-timepicker
        @change="changeTime($event, 'timeTo')"
        :minute-interval="10"></vue-timepicker>
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
  import Datepicker from 'vuejs-datepicker';
  import VueTimepicker from 'vue2-timepicker';
  import 'vue2-timepicker/dist/VueTimepicker.css'
  import moment from 'moment';

  import { mapState, mapActions } from 'vuex';

  export default {
    data () {
      return {
        disabledDates: {
          customPredictor: function(date) {
            const today = new Date();
            const yesterday = today.setDate(today.getDate() - 1);
            return date < yesterday;
          }
        },
        formData: {
          title: null,
          startDate: new Date(),
          timeTo: null,
          timeFrom: null,
          category: null
        }
      }
    },
    async mounted() {
      await this.getEventCategories();
      await this.emitFormData();
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
        this.$emit('stepUpdated', { data: this.formData, isValid: !this.$v.$invalid });
      },
      setDate(date) {
        this.formData.startDate = moment(date).format();
        this.emitFormData();
      },
      changeTime (event, field) {
        const hours = event.data.HH || '00';
        const minutes = event.data.mm || '00';
        this.formData[field] = hours + ':' + minutes;
        this.emitFormData();
      }
    },
    components: {
      Datepicker,
      VueTimepicker
    }
  }
</script>

<style scoped>
  .time-picker {
    display: block;
  }
</style>