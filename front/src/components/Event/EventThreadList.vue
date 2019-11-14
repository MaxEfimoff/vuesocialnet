<template>
  <div>
    <div v-for="thread in threads" :key="thread._id">
      <div class="flex-left">
        <router-link
          :to="`/profile/handle/${thread.profile.handle}`">
          <div class="leftmargin">
            <img class="groups-img" :src="thread.profile.avatar">
            <div class='text-center'>
              <span>{{ thread.profile.handle }}</span>
            </div>
          </div>
        </router-link>
        <div class="leftmargin text-left">
          <div><p>{{ thread.title }}</p></div>
          <span>{{thread.updatedAt | fromNow}}</span>
        </div>
      </div>
      <div
        v-for="post in thread.eventThreadPosts"
        :key="post._id"
        class="leftmargin">
        <div class="flex-left leftmargin">
          <router-link
            :to="`/profile/handle/${post.profile.handle}`">
            <div>
              <img class="groups-img" :src="post.profile.avatar">
              <div class='text-center'>
                <span>{{ post.profile.handle }}</span>
              </div>
            </div>
          </router-link>
          <div class="leftmargin text-left">
            <div><p>{{ post.text }}</p></div>
            <span>{{post.updatedAt | fromNow}}</span>
          </div>
        </div>
      </div>
      <EventPostCreate
        class="padding"
        v-if="canMakePost" 
        :eventThreadId="thread._id"/>
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