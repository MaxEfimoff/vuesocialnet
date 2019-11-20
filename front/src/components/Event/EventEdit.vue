<template>
  <section class="">
    <div class="posts">
    <h2>
      {{event.startDate | formatDate}}
    </h2>
    <p>
      Created by <strong>{{eventCreator.name}}</strong>
    </p>
    <div class="margin">
      <input
        v-model="event.title"
        type="text">
    </div>
    <p><b>Time</b></p>
    <div class="margin">
      <datepicker
        @input="setDate"
        :value="event.startDate"
        :disabledDates="disabledDates"
        :input-class="'input'"
        >
      </datepicker>
    </div>
    <div class="margin">
      <vue-timepicker 
        v-model="currentEvent.timeFrom"
        @change="changeTime($event, 'timeFrom')"
        :minute-interval="10">
      </vue-timepicker>
    </div>
    <div class="margin">
      <vue-timepicker
        v-model="currentEvent.timeTo"
        @change="changeTime($event, 'timeTo')"
        :minute-interval="10">
      </vue-timepicker>
    </div>
    <div class="margin">
      <select v-model="event.eventcategory">
        <option
          v-for="eventcategory of eventcategories"
          :value="eventcategory"
          :key="eventcategory.id">{{eventcategory.name}}
        </option>
      </select>
    </div>
    <div class="margin">
      <input
        v-model="event.location"
        class="input"
        type="text">
    </div>
    <div class="margin">
      <textarea
        v-model="event.shortInfo"
        class="textarea"
        rows="5">
      </textarea>
    </div>
    <div class="margin">
      <textarea
        v-model="event.description"
        class="textarea"
        rows="5">
      </textarea>
    </div>
      <button 
        @click="updateEventHandler">Update</button>
    </div>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker';
import moment from 'moment';

import { mapState, mapActions } from 'vuex';

export default {
  props: {
    id: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      disabledDates: {
        customPredictor: function(date) {
          const today = new Date();
          const yesterday = today.setDate(today.getDate() - 1);
          return date < yesterday;
        }
      },
    }
  },
  created() {
    this.getEventById(this.id);
    this.getEventCategories();
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('events', ['event']),
    ...mapState('eventcategories', ['eventcategories']),
    currentEvent () {
      const event = this.event;
      const timeTo = this.parseTime(event.timeTo);
      const timeFrom = this.parseTime(event.timeFrom);

      return {...event, timeFrom, timeTo}
    },
    eventCreator () {
      return this.event.profile || {}
    },
  },
  methods: {
    ...mapActions("events", ['getEventById', 'updateEvent']),
    ...mapActions("eventcategories", [ 'getEventCategories' ]),
    setDate(date) {
      this.event.startDate = moment(date).format();
    },
    changeTime({data}, field) {
      const hours = data.HH || '00';
      const minutes = data.mm || '00';
      this.event[field] = hours + ':' + minutes;
    },
    parseTime (time) {
      const [HH, mm] = time.split(':')
      return {HH, mm}
    },
    hasValue (event) {
      const eventLength = Object.keys(event).length
      return eventLength && eventLength > 0
    },
    updateEventHandler() {
      this.updateEvent(this.event)
      .then(() => this.$emit('closeModal'))
      .catch(err => console.log(err))
    }
  },
  components: {
    Datepicker,
    VueTimepicker
  },
}
</script>

<style>

</style>