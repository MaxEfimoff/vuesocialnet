<template>
  <div class="section posts padding">
    <h4>Welcome! Please setup your profile!</h4>
    <div class="edit-profile">
      <router-link
        :to="{ name: 'createProfile' }">
        <span>Create profile</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>