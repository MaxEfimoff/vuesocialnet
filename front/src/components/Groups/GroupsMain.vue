<template>
  <section class="section-center">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li>
            <a 
              @click.prevent="navigateTo(1)"
              :class="activeComponentClass(1)"
            >All Groups</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(2)"
              :class="activeComponentClass(2)"
            >My Groups</a>
          </li>
          <li>
            <a 
              @click.prevent="navigateTo(3)"
              :class="activeComponentClass(3)"
            >Manage Groups</a>
          </li>
          <li>
            <a href="">Liked</a>
          </li>
        </ul>
        <ModalGroup/>
        <form action="#" class="search-form leftmargin">
          <input type="text" placeholder="Group search" />
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
import Groups from'./Groups';
import MyGroups from'./MyGroups';
import ManageGroups from'./ManageGroups';
import ModalGroup from '../Group/ModalGroup.vue';

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
    activeComponent() {
      return this.steps[this.activeStep - 1]
    }
  },
  data() {
    return {
      activeStep: 1,
      steps: [
        Groups,
        MyGroups,
        ManageGroups,
      ]
    }
  },
  components: {
    Groups,
    MyGroups,
    ManageGroups,
    ModalGroup
  }
}
</script>

<style>

</style>