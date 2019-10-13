<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <router-link
          :to="{ name: 'documentForm' }"
        >
          <button>Add new document</button>
        </router-link>
        <form action="#" class="search-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper">
        <div class="post"  v-for="document in documents" :key="document.id">
          <div class="post-author">
            <!-- <router-link
              :to="`/documents/${document._id}`"
            > -->
              <div class="groups-photo">
                <i class="fas fa-sticky-note fa-2x"></i>
                <a
                  class="leftpadding"
                  :href=" require(`../../../../back/uploads/${document.document}`) "
                  download
                >
                  {{ document.document }}
                </a>
              </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'documents',
  mounted() {
    this.getDocuments();
  },
  computed: {
    ...mapState('documents', ['documents']),
  },
  methods: {
    ...mapActions("documents", ['getDocuments']),
  },
}
</script>

<style>

</style>