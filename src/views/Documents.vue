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
              <button>Add new document</button>
              <form action="#" class="post-new-form">
                <input type="text" placeholder="Search" />
              </form>
            </div>
            <div class="post-wrapper">
              <div class="post"  v-for="document in documents" :key="document.id">
                <div class="post-author">
                  <div class="groups-photo">
                    <i class="fas fa-file-alt fa-2x"></i>
                    <span>{{ document.name }}</span>
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
  name: 'documents',
  data() {
    return {
      documents: [
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
              name: "Ann's documents",
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
