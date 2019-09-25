<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <h3>{{ group.handle }}</h3>
      </div>
        <h4>{{ group.status }}</h4>
        <span>{{ group.info }}</span>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  created() {
    this.getGroup(this.$route.params.id);
  },
  computed: {
    ...mapState('groups', ['group']),
  },
  methods: {
    ...mapActions("groups", ['getGroup']),
  },
}
</script>

<style>

</style>