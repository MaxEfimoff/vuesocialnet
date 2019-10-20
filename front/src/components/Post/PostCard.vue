<template>
  <div class="post-author">
    <router-link
      :to="`/profile/handle/${post.name}`">
      <div>
        <img class="groups-img" :src="post.avatar" alt="">
        <div class='text-center'>
          <span>{{ post.name }}</span>
        </div>
      </div>
    </router-link>
    <router-link
      :to="`/posts/${post._id}`"
    >
    <div class="leftmargin">
      <span>{{ post.text }}</span>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>

</style>