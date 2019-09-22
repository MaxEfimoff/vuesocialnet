<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Friends />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Friends from '@/components/Friends/Friends.vue';

import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Header,
    LeftSection,
    Friends
  },
}
</script>
