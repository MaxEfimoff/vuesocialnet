<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <h3>{{ note.name }}</h3>
      </div>
      <div class="post-wrapper">
        <div class="post">
          <div class="post-author">
              <div class="groups-photo">
                <p>{{ note.text }}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'note',
  created() {
    this.getNoteById(this.$route.params.id);
  },
  computed: {
    ...mapState('notes', ['note']),
  },
  methods: {
    ...mapActions("notes", ['getNoteById']),
  },
}
</script>

<style>

</style>