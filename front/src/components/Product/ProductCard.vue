<template>
  <div class="halfpadding product-card">
    <img class="product-card-image" :src="image" alt="">
    <div>
      <span>{{ text | shortenText(24) }}</span>
    </div>
    <router-link
      :to="`/profile/handle/${name}`">
      <div class='text-center'>
        <span>{{ name }}</span>
        <span class="lefthalfpadding">{{ date | formatDate }}</span>
        <span v-if="price" class="lefthalfpadding">{{ price }} руб.</span>
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
    // address: {
    //   required: true,
    //   type: String
    // },
    text: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: String
    },
    image: {
      type: String
    },
    price: {
      type: Number
    },
    discountedPrice: {
      type: Number
    }
  }
}
</script>

<style>

</style>