<template>
  <section class="section-center">
    <div v-if="isDataLoaded" class="posts">
      <div class="product-image" :style="{ backgroundImage: 'url(' + `${event.image}` + ')' }"></div>
      <router-link
          :to="`/profile/handle/${event.profile.handle}`">
        <div class="avatar">
          <img :src="event.profile.avatar" alt="">
        </div>
      </router-link>
      <span>{{ event.eventcategory.name }}</span>
      <div v-if="isEventAuthor">
        <button @click.prevent="show()">Edit event</button>
        <button @click.prevent="deleteEventHandler()">Delete event</button>
        <modal name="ModalEventEdit" height="auto" >
          <EventEdit
            @closeModal="hide"
            :id="id"/>
        </modal>
      </div>
      <div class="post-author">
        <div class="leftpadding">
          <p>{{ event.description }}</p>
        </div>
        <!-- <i class="fas fa-thumbs-up" @click="addLike"></i>{{' '}}<span>{{ event.likes.length }}</span> 
        
        <div class="error-message">
          {{this.errors.alreadyliked}}
        </div>-->
      </div>
      <div class="halfpadding">
        <button
          v-if="isEventMember"
          @click="leaveEventHandler"
          >Leave event</button>
        <button v-if="canJoin" @click="joinEventHandler">Join event</button>
      </div>
      <div v-if="eventMembers.length > 0">
        <router-link
          v-for="profile in eventMembers"
          :key="profile.id"
          :to="`/profile/handle/${profile.handle}`"
        >
          <img
            class="friends-photo"
            :src="profile.avatar"
            alt=""
            :title='profile.handle'
          >
        </router-link>
      </div>
      <EventThreadList 
        :threads="eventthreads"
        :canMakePost="canMakePost"/>
      <button v-if="!isAllThreadsLoaded" @click="getEventThreadsHandler">Load more comments</button>
      <div v-if="isEventMember || isEventAuthor" class="padding">
        <textarea
          class="textarea"
          placeholder="Start a new thread"
          v-model="formData.title"/>
        <button @click="createThread">Create Thread</button>
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Spinner from '@/components/helpers/Spinner';
import EventThreadList from '@/components/Event/EventThreadList';
import EventEdit from '@/components/Event/EventEdit';

export default {
  name: 'Event',
  props: {
    id: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      threadPageNumber: 0,
      threadPageSize: 5,
      isDataLoaded: false,
      formData: {
        title: null,
      },
    };
  },
  created() {
    // this.getEventThreadsByEventId(this.id);
    this.exportCurrentProfile();
    this.getEventById(this.id)
        .then(() => {
          this.isDataLoaded = true;
          this.threadPageNumber++;
        })
    this.getEventThreadsHandler({init: true});

    // New thead posts will be visible through sockets only for
    // event author and event members
    if(this.canMakePost) {
      // We are emitting 'event/subscribe' event to our socket and sending this.id
      this.$socket.emit('event/subscribe', this.id);
      // We are catching 'event/postPublished' event we sent from
      // `event-${createdEventPost.event}` socket and executing 
      // this.addPostToEventThreadHandler function
      this.$socket.on('event/postPublished', this.addPostToEventThreadHandler);
    }
  },
  destroyed() {
    this.$socket.removeListener('event/postPublished', this.addPostToEventThreadHandler);
    // We are unsibscribing from our socket
    this.$socket.emit('event/unsubscribe', this.id);
  },
  computed: {
    ...mapState('events', ['event']),
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile' ]),
    ...mapState('eventthreads', [ 'eventthreads', 'eventthread', 'isAllDataLoaded']),
    isEventAuthor() {
      return this.$store.state.events.event.profile._id === this.$store.state.profile.profile._id;
    },
    isEventMember() {
      const members = this.$store.state.events.event.joinedPeople;
      if (members && members.some(e => e._id === this.$store.state.profile.profile._id)) {
        return true;
      }
    },
    canJoin() {
      return !this.isEventAuthor && !this.isEventMember;
    },
    eventMembers() {
      return this.$store.state.events.event.joinedPeople;
    },
    canMakePost() {
      return this.isEventAuthor || this.isEventMember;
    },
    isAllThreadsLoaded() {
      return this.isAllDataLoaded;
    }
  },
  methods: {
    ...mapActions("events", ['getEventById', 'joinEvent', 'leaveEvent', 'deleteEvent']),
    ...mapActions("eventthreads", ['getEventThreadsByEventId', 'addPostToEventThread', 'addEventThread']),
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    // addLike() {
    //   this.$store.dispatch('events/addLike', this.id)
    //   .catch((error) => {console.log(error)})
    // },
    show() {
      this.$modal.show('ModalEventEdit', this.id);
    },
    hide() {
      this.$modal.hide('ModalEventEdit');
    },
    getEventThreadsHandler({init}) {
      const filter = {
        pageNum: this.threadPageNumber,
        pageSize: this.threadPageSize
      }
      
      const eventId = this.id;

      this.getEventThreadsByEventId({eventId: eventId || this.$store.state.events.event._id, filter, init})
        .then(() => {
          this.isDataLoaded = true;
          this.threadPageNumber++;
        })
    },
    joinEventHandler() {
      const id = this.id;
      this.joinEvent(id)
      .catch((error) => {console.log(error)})
    },
    leaveEventHandler() {
      const id = this.id;
      this.leaveEvent(id)
      .catch((error) => {console.log(error)})
    },
    createThread() {
      const payload = {
        event: this.id,
        formData: this.formData,
        profile: this.$store.state.profile.profile
      }
      this.addEventThread(payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)})
    },
    addPostToEventThreadHandler (post) {
      this.addPostToEventThread({post, eventThreadId: post.eventThread})
    },
    deleteEventHandler() {
      const id = this.id;
      this.deleteEvent(id)
        .then(() => this.$router.push({ name: 'events' }))
        .catch((error) => {
          console.log(error)
        });
    }
  },
  components: {
    Spinner,
    EventThreadList,
    EventEdit
    
  }
}
</script>

<style>

</style>