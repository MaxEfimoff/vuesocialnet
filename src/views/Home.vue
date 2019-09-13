<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <CenterSection />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'
import CenterSection from '@/components/CenterSection.vue'

export default {
  name: 'home',
  components: {
    Header,
    LeftSection,
    CenterSection
  }
}
</script>
