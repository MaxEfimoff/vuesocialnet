<template>
  <div class="friends-list padding">
          <ul  class="flex">
            <li>
              <router-link to="/">All Posts</router-link>
            </li>
            <li>
              <router-link to="/my-posts">My Posts</router-link>
            </li>
            <li>
              <a href="">Friends Posts</a>
            </li>
            <li>
              <a href="">Recommended</a>
            </li>
            <li>
              <a href="">Liked</a>
            </li>
          </ul>
          <router-link
            :to="{ name: 'postForm' }"
          >
            <button>New post</button>
          </router-link>
          <form action="#" class="post-new-form">
            <input type="text" placeholder="Post search" />
          </form>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>