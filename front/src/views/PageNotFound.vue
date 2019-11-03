<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <section class="section-center">
          <div class="section posts">
            <div class="post-new noleftpadding post flex">
              <h3>Page not found</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';

export default {
  components: {
    Header,
    LeftSection
  }
}
</script>

<style>

</style>