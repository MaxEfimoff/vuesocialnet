<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <ManageGroups />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

// @ is an alias to /src
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import ManageGroups from '@/components/Groups/ManageGroups.vue';

export default {
  components: {
    Header,
    LeftSection,
    ManageGroups
  }
}
</script>
