<template>
  <section class="section-center" v-if="this.profile.handle">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li>
            <a 
              @click.prevent="navigateTo(1)"
              :class="activeComponentClass(1)"
            >All Products</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(2)"
              :class="activeComponentClass(2)"
            >My Products</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(3)"
              :class="activeComponentClass(3)"
            >Friends Products</a>
          </li>
          <li>
            <a href="">Liked</a>
          </li>
        </ul>
        <!-- <ModalProduct/> -->
        <router-link :to="{ name: 'productForm' }">
          <button>Add product</button>
        </router-link>
        <form action="#" class="search-form leftmargin">
          <input type="text" placeholder="Product search" />
        </form>
      </div>
      <keep-alive>
        <component
          :is="activeComponent" 
          />
      </keep-alive>
    </div>
  </section>
</template>

<script>
import Products from'./Products';
import MyProducts from'./MyProducts';
import FriendsProducts from'./FriendsProducts';
// import ModalProduct from './ModalProduct.vue';

import { mapState } from 'vuex';

export default {
  methods: {
    navigateTo(step) {
      this.activeStep = step;
    },
    activeComponentClass(step) {
      return this.activeStep === step ? 'is-active' : ''
    }
  },
  computed: {
    ...mapState('profile', ['profile']),
    activeComponent() {
      return this.steps[this.activeStep - 1]
    }
  },
  data() {
    return {
      activeStep: 1,
      steps: [
        Products,
        MyProducts,
        FriendsProducts,
      ]
    }
  },
  components: {
    Products,
    MyProducts,
    FriendsProducts,
    // ModalProduct
  }
}
</script>

<style>

</style>