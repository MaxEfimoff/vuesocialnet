<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-wrapper">
        <div class="post">
          <div class="post-author">
              <div class="groups-photo">
                <p>{{ document }}</p>
              </div>
            <i class="fas fa-trash-alt" @click="deleteDocument"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'document',
  created() {
    this.getDocumentById(this.$route.params.id);
  },
  computed: {
    ...mapState('documents', ['document']),
  },
  methods: {
    ...mapActions("documents", ['getDocumentById']),
    deleteDocument() {
      this.$store.dispatch('documents/deleteDocument', this.$route.params.id)
      .then(() => this.$router.push({ name: 'documents' }))
      .catch((error) => {console.log(error)
    })
    }
  },
}
</script>

<style>

</style>