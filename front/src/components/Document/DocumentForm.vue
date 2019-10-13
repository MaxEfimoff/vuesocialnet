<template>
  <section class="posts">
    <h2 class="padding">Document Form</h2>
    <form @submit.prevent="sendFile" class="padding" enctype="multipart/form-data">
      <div class="halfpadding dropzone">
        <input
          type="file"
          ref="file"
          class="input-file"
          @change="sendFile"
        />
        <p class="call-to-action">
          Drag your files here
        </p>
      </div>
      <div class="error-message">
        {{ this.errors.text }}
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from 'axios';

export default {
  data() {
    return {
        file: '',
        uploadedFiles: [],
    };
  },
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('errors', [ 'errors' ]),
    ...mapState('profile', [ 'profile' ])
  },
  methods: {
    ...mapActions("documents", [ 'addDocument' ]),
    sendFile() {
      const file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', file);

      axios.post(`http://localhost:5000/api/documents`, formData, {
				params: {
					user: this.$store.state.profile.profile.user._id
				}
			})
      .then(() => this.$router.push({ name: 'documents' }))
      .catch((error) => {console.log(error)
      })
      // this.$store.dispatch('documents/addDocument', formData)
      // .then(() => this.$router.push({ name: 'documents' }))
      // .catch((error) => {console.log(error)
      // })
    },
  },
}
</script>

<style scoped>
  .dropzone {
    position: relative;
    cursor: pointer;
    border: 1px solid var(--primary-color);
    height: 10rem;
    width: 100%;
    min-width: 10rem;
    padding: 0.5rem;
    background-color: var(--primary-color);
    border-radius: 0.2rem;
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    font-size: 0.8rem;
  }

  .dropzone .call-to-action {
    text-align: center;
    padding: 70px 0 0 0;
  }
</style>