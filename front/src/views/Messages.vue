<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Messages />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'
import Messages from '@/components/Messages/Messages.vue';

export default {
  components: {
    Header,
    LeftSection,
    Messages
  }
}
</script>
