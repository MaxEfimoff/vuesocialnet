<template>
  <div class="halfpadding product-card">
    <router-link
      :to="address"
    >
      <img class="product-card-image" :src="image" alt="">
      <div>
        <span>{{ text }}</span>
      </div>
    </router-link>
    <router-link
      :to="`/profile/handle/${name}`">
      <div class='text-center'>
        <span>{{ name }}</span>
      </div>
    </router-link>
    
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    },
    avatar: {
      required: true,
      type: String
    },
    address: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    image: {
      type: String
    }
  }
}
</script>

<style>

</style>