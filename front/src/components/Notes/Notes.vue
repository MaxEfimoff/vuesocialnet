<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <router-link
          :to="{ name: 'noteForm' }"
        >
          <button>Add new note</button>
        </router-link>
        <form action="#" class="post-new-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper">
        <div class="post"  v-for="note in notes" :key="note.id">
          <div class="post-author">
            <router-link
              :to="`/notes/${note._id}`"
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
// @ is an alias to /src
// import Header from '@/components/Header.vue'
// import LeftSection from '@/components/LeftSection.vue'
import { mapState, mapActions } from 'vuex';

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
  // components: {
  //   Header,
  //   LeftSection
  // }
}
</script>

<style>

</style>