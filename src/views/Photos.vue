<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <section class="section-center">
          <!-- Posts -->
          <div class="section posts">
            <div class="padding">
              <div class="edit-profile">
                <button>Upload new photo</button>
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
  name: 'home',
  components: {
    Header,
    LeftSection,
  }
}
</script>
