<template>
  <div class="halfpadding product-card">
    <img class="product-card-image" :src="image" alt="">
    <div>
      <span>{{ title | shortenText(24) }}</span>
    </div>
    <router-link
      :to="`/profile/handle/${name}`">
      <div class='text-center'>
        <span>{{ name }}</span>
        <span class="lefthalfpadding">{{ startDate | formatDate }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    name: {
      type: String
    },
    // address: {
    //   required: true,
    //   type: String
    // },
    title: {
      type: String
    },
    startDate: {
      required: true,
      type: String
    },
    image: {
      type: String
    },
  },
}
</script>

<style>

</style>