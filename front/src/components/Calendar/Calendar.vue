<template>
  <section class="section-center">
    <div class="section posts padding">
      <Fullcalendar
        :plugins="calendarPlugins"
        :header="{
          left: 'title',
          center: 'dayGridMonth, timeGridWeek, timeGridDay, list',
          right: 'prev today next'
        }"
        :selectable="true"
        :events="getEvents"
        :editable="true"
        @select="handleSelect"
        @eventClick="handleClick"
        @eventResize="updateEvent"
        @eventDrop="updateEvent"
        @eventRender="renderEvent"
      />
    </div>
    <modals-container />
  </section>
</template>

<script>
require('@fullcalendar/core/main.min.css');
require('@fullcalendar/daygrid/main.min.css');
require('@fullcalendar/timegrid/main.min.css');

import modal from 'vue-js-modal';

import Fullcalendar from '@fullcalendar/vue';
import DayGridPlugin from '@fullcalendar/daygrid';
import TimeGridPlugin from '@fullcalendar/timegrid';
import InteractionPlugin from '@fullcalendar/interaction';
import ListPlugin from '@fullcalendar/list';

import EventModal from './EventModal';
import CommentsModal from './CommentsModal';

import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      calendarPlugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin
      ]
    }
  },
  computed: {
    ...mapGetters('events', ['getEvents']),
  },
  methods: {
    handleSelect(arg) {
      this.$store.commit('events/ADD_EVENT', {
        id: (new Date().getTime()),
        title: "Something",
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay
      })
    },
    handleClick(arg) {
      this.$modal.show(EventModal, {
        text: "This is from the component",
        event: arg.event
      })
    },
    updateEvent(arg) {
      this.$store.commit('events/UPDATE_EVENT', arg.event)
    },
    renderEvent(arg) {
      let span = document.createElement('span')
      span.setAttribute('class', 'fa fa-comments white-font-no-shadow')
      arg.el.appendChild(span)
      span.addEventListener('click', event => {
        event.stopPropagation(); 
        this.$modal.show(CommentsModal, {
            text: "This is for the comments"
        })
      })
    },
  },
  components: {
    Fullcalendar,
    CommentsModal
  }
}
</script>

<style>

</style>