<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <h3>{{ note.title }}</h3>
      </div>
      <div class="post-wrapper">
        <div class="post">
          <div class="post-author">
              <div class="groups-photo">
                <p>{{ note.text }}</p>
              </div>
              
            <i class="fas fa-trash-alt" @click="deleteNote"></i>
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
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', this.$route.params.id)
      .then(() => this.$router.push({ name: 'notes' }))
      .catch((error) => {console.log(error)
    })
    }
  },
}
</script>

<style>

</style>