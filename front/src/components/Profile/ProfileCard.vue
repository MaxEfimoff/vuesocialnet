<template>
<div class="relative">
  <div class="post-author">
    <div class="groups-photo lefthalfpadding">
      <router-link
        :to="{ name: 'profile', params: { handle: profile.handle } }">
        <img class="groups-img" :src="profile.avatar" alt="">
        <div class="text-center">
          <div><a>{{ profile.handle }}</a></div>
        </div>
      </router-link>
    </div>
    <div class="leftpadding">
      <div class="show-more">
          <i
            @click="toggleVisibilityUser"
            :class="[visibleUser ? 'fas fa-chevron-up': 'fas fa-chevron-down']"
            id="showMoreInfo"
            ref="showMoreInfo"
          ></i>
      </div>
    </div>
    <PopupMenu
      v-if="visibleUser"
      :listItems="listItems"/>
    <!-- <transition name="dropdown-fade">
      <div v-if="visibleUser" class="block absolute section">
      </div>
    </transition > -->
  </div>
    
</div>
</template>

<script>
import PopupMenu from '@/components/helpers/PopupMenu.vue'
// import { toggleVisibilityMixin } from '@/components/helpers/mixins.js';

export default {
  // mixins: [ toggleVisibilityMixin ],
  data() {
    return {
      visibleUser: false,
      listItems: [
        {
          name: 'Add to friends',
          link: 'friends',
        },
        {
          name: 'See friends',
          link: 'posts',
        },
        {
          name: 'Block user',
          link: 'documents',
        },
      ]
    }
  },
  props: {
    profile: {
      required: true,
      type: Object
    }
  },
  methods: {
    toggleVisibilityUser() {
      this.visibleUser =!this.visibleUser;
    }
  },
  components: {
    PopupMenu
  }
}
</script>

<style>

</style>