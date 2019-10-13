<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <Groups />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

// @ is an alias to /src
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import Groups from '@/components/Groups/GroupsMain.vue';

export default {
  components: {
    Header,
    LeftSection,
    Groups
  }
}
</script>
