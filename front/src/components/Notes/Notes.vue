<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <ModalNote/>
        <form action="#" class="search-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper">
        <div class="post"  v-for="note in notes" :key="note.id">
          <div class="post-author">
            <router-link
              :to="{ name: 'note', params: { id: note._id } }"
            >
              <div class="groups-photo">
                <i class="fas fa-sticky-note fa-2x"></i>
                <a class="leftpadding">{{ note.title }}</a>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalNote from './ModalNote.vue';

export default {
  name: 'notes',
  created() {
    this.getNotes();
  },
  computed: {
    ...mapState('notes', ['notes']),
  },
  methods: {
    ...mapActions("notes", ['getNotes']),
    
  },
  components: {
    ModalNote
  }
}
</script>

<style>

</style>