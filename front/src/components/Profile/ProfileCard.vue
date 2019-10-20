<template>
  <div class="post-author">
    <div class="groups-photo lefthalfpadding">
      <router-link
        :to="`/profile/handle/${profile.handle}`">
        <img class="groups-img" :src="profile.avatar" alt="">
        <div class="text-center">
          <div><a>{{ profile.handle }}</a></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>

</style>