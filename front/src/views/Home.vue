<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <PostsMain />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'
import PostsMain from '@/components/PostsMain.vue'

export default {
  name: 'home',
  components: {
    Header,
    LeftSection,
    PostsMain
  }
}
</script>
