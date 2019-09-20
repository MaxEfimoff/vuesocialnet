<template>
  <div>
    <Header />
    <div class="register padding">
      <section class="section posts">
        <h2 class="padding">Login</h2>
        <form @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <input
              type="text"
              placeholder="Email Address"
              v-model="formData.email"
              ref="email"
            />
          </div>
          <div class="error-message">
            {{this.errors.email}}
          </div>
          <div class="halfpadding">
            <input
              type="password"
              ref="password"
              placeholder="Password"
              outlined
              v-model="formData.password"
            >
          </div>
          <div class="error-message">
            {{this.errors.password}}
          </div>
          <div class="padding">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from '@/components/Header.vue'

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      tab: 'Login',
    };
  },
  computed: {
    ...mapState('errors', ['errors']),
  },
  methods: {
    submitForm() {
          this.$store.dispatch('auth/login', this.formData)
          .then(() => this.$router.push({ name: 'posts' }))
          .catch((error) => {console.log(error)
          // });
      })
    },
  },
  components: {
    Header,
  }
};
</script>

<style>
</style>
