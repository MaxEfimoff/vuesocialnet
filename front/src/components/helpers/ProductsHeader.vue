<template>
  <div class="friends-list padding">
    <ul  class="flex">
      <li>
        <router-link to="/products">All Products</router-link>
      </li>
      <li>
        <router-link to="/my-products">My Products</router-link>
      </li>
      <li>
        <router-link to="/friends-products">Friends Products</router-link>
      </li>
      <li>
        <a href="">Liked</a>
      </li>
    </ul>
    <router-link
      :to="{ name: 'productForm' }"
    >
      <button>New product</button>
    </router-link>
    <form action="#" class="post-new-form">
      <input type="text" placeholder="Product search" />
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>