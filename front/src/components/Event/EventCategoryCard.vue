<template>
  <div class="halfpadding product-card">
    <router-link
      :to="{name: 'eventsSearchCategory',
      params: {eventcategory: eventcategory.name}}">
      <!-- <img class="product-card-image" :src="eventcategory.image"> -->
      <div>
        <span>{{eventcategory.name | capitalize}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    eventcategory: {
        required: true,
        type: Object
      }
  },
}
</script>

<style>

</style>