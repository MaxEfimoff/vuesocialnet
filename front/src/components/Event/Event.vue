<template>
  <section class="section-center">
    <div v-if="isDataLoaded" class="posts">
      <div class="product-image" :style="{ backgroundImage: 'url(' + `${event.image}` + ')' }">
      </div>
      <router-link
          :to="`/profile/handle/${event.profile.handle}`">
        <div class="avatar">
          <img :src="event.profile.avatar" alt="">
        </div>
      </router-link>
      <span>{{ event.eventCategory.name }}</span>
      <div v-if="isEventAuthor">
        <span href="" @click.prevent="show">Edit event</span>
        <modal name="ModalEditEvent" height="auto">
          <EditEvent
            :id="id"
            @closeModal="hide"/>
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
          @click="leaveEvent"
          >Leave event</button>
        <button v-if="canJoin" @click="joinEvent">Join event</button>
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
      <div v-if="isEventMember || isEventAuthor" class="padding">
        <textarea
          class="textarea"
          placeholder="Start a new thread"
          v-model="formData.title"/>
        <button @click="createThread">Create Thread</button>
      </div>
        <!-- Comments -->
        <!-- <div
          class="message"
          v-for="comment in product.comments"
          :key="comment.id"
        >
          <div class="flex-left-nowrap">
             <div>
              <router-link
                :to="`/profile/handle/${comment.name}`">
                <img class="groups-img" :src="comment.avatar" alt="">
                <div class='text-center'>
                  <span>{{ comment.name }}</span>
                </div>
              </router-link>
            </div>
            <div class="groups-photo">
              <a class="leftpadding">{{ comment.text }}</a>
            </div>
          </div>
        </div> -->
        <!-- Comments form -->
        <!-- <form ref="text" @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <textarea
              class="textarea"
              placeholder="Coment"
              v-model="formData.text"
            />
          </div>
          <div class="padding">
            <button type="submit">Submit</button>
          </div>
        </form> -->
        <!-- Comments form -->
    </div>
    <div v-else>
      <Spinner />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Spinner from '@/components/helpers/Spinner';
// import EditEvent from '@/components/Event/EditEvent';

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
      isDataLoaded: false,
      formData: {
        title: null,
      },
    };
  },
  created() {
    this.getEventById(this.id)
      .then(() => {
        this.isDataLoaded = true;
      })
    this.getEventThreadsByEventId(this.id);
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('events', ['event']),
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile' ]),
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
    }
  },
  methods: {
    ...mapActions("events", ['getEventById']),
    ...mapActions("eventthreads", ['getEventThreadsByEventId']),
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    // addLike() {
    //   this.$store.dispatch('events/addLike', this.id)
    //   .catch((error) => {console.log(error)})
    // },
    // submitForm() {
    //   const payload = {
    //     eventId: this.id,
    //     formData: this.formData
    //   }
    //   this.$store.dispatch('events/addComment', payload)
    //   .then(this.formData = {})
    //   .catch((error) => {console.log(error)})
    // },
    show() {
      this.$modal.show('ModalEditEvent', this.id);
    },
    hide() {
      this.$modal.hide('ModalEditEvent');
    },
    joinEvent() {
      const id = this.id;
      this.$store.dispatch('events/joinEvent', id)
      .catch((error) => {console.log(error)})
    },
    leaveEvent() {
      const id = this.id;
      this.$store.dispatch('events/leaveEvent', id)
      .catch((error) => {console.log(error)})
    },
    createThread() {
      const payload = {
        event: this.id,
        formData: this.formData,
        profile: this.$store.state.profile.profile
      }
      this.$store.dispatch('eventthreads/addEventThread', payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)})
      // .then(this.formData = {})
      // .catch((error) => {
      //   console.log(error)
      // })
    }
  },
  components: {
    Spinner,
    // EditEvent,
    
  }
}
</script>

<style>

</style>