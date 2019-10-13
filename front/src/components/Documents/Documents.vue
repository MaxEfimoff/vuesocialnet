<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <ModalDocument />
        <form action="#" class="search-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper">
        <div class="post"  v-for="document in documents" :key="document.id">
          <div class="post-author">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalDocument from './ModalDocument.vue';

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
  components: {
    ModalDocument
  }
}
</script>

<style>

</style>