<template>
  <div class="post-author">
    <router-link
      :to="`/profile/handle/${name}`">
      <div>
        <img class="groups-img" :src="avatar" alt="">
        <div class='text-center'>
          <span>{{ name }}</span>
        </div>
      </div>
    </router-link>
    <router-link
      :to="address"
    >
    <div class="leftmargin">
      <span>{{ text }}</span>
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
    }
  }
}
</script>

<style>

</style>