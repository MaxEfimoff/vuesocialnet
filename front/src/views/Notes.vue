<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <section class="section-center">
          <!-- Posts -->
          <div class="section posts">
            <div class="post-new padding">
              <button>Add new note</button>
              <form action="#" class="post-new-form">
                <input type="text" placeholder="Search" />
              </form>
            </div>
            <div class="post-wrapper">
              <div class="post"  v-for="note in notes" :key="note.id">
                <div class="post-author">
                  <div class="groups-photo">
                    <i class="fas fa-sticky-note fa-2x"></i>
                    <span>{{ note.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'

export default {
  name: 'notes',
  data() {
    return {
      notes: [
            {
              id: 1,
              name: "New contract",
            },
            {
              id: 2,
              name: "My portfolio",
            },
            {
              id: 3,
              name: "Ann's notes",
            },
            {
              id: 4,
              name: "Catcher in the rye",
            },
          ]
    }
  },
  components: {
    Header,
    LeftSection
  }
}
</script>
