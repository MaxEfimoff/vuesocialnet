<template>
  <div>
    <h4>Event Threads</h4>
    <div v-for="thread in threads" :key="thread._id" class="">
      <h4 id="const" class="">{{thread.title}}</h4>
      <EventPostCreate
        v-if="canMakePost" 
        :eventThreadId="thread._id"/>
      <!--  <article v-for="post in thread.posts" :key="post._id" class="">
        <figure class="">
          <p class="">
            <img class="" :src="post.profile.avatar">
          </p>
        </figure>
        <div class="">
          <div class="">
            <div class="">
              <strong class="">{{post.profile.name}}</strong>
              {{' '}}
              <small class="">{{post.updatedAt | fromNow}}</small>
              <br>
              <p class="">{{post.text}}</p>
            </div>
          </div>
        </div>
      </article> -->
      <!-- Posts END -->
    </div>
  </div>
</template>

<script>
import EventPostCreate from '@/components/Event/EventPostCreate';

export default {
  props: {
      threads: {
        type: Array,
        required: true
      },
      canMakePost: {
        type: Boolean,
        required: true
      }
    },
    components: {
      EventPostCreate
    }
}
</script>

<style>

</style>