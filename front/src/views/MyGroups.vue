<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <MyGroups />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

// @ is an alias to /src
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import MyGroups from '@/components/Groups/MyGroups.vue';

export default {
  components: {
    Header,
    LeftSection,
    MyGroups
  }
}
</script>
