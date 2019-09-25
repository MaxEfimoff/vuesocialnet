<template>
  <div>
    <Header />
    <div class="register padding">
      <section class="section posts">
        <h2 class="padding">Registration</h2>
        <form @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <input
              type="text"
              v-model="formData.name"
              placeholder="Name"
              ref="name"
            />
          </div>
          <div class="error-message">
            {{this.errors.name}}
          </div>
          <div class="halfpadding">
            <input
              type="text"
              placeholder="Email Address"
              v-model="formData.email"
              id="email"
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
              v-model="formData.password"
            >
          </div>
          <div class="error-message">
            {{this.errors.password}}
          </div>
          <div class="halfpadding">
            <input
              type="password"
              placeholder="Confirm Password"
              ref="password2"
              v-model="formData.password2"
            >
          </div>
          <div class="error-message">
            {{this.errors.password2}}
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
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'

export default {
  name: 'Register',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        password2: '',
        name: '',
      },
      tab: 'Register',
    };
  },
  computed: {
    ...mapState('errors', ['errors']),
  },
  methods: {
    submitForm() {
        this.$store.dispatch('auth/register', this.formData)
          .then(() => this.$router.push({ name: 'login' }))
          .catch((error) => {
            console.log(error)
          });
    },
  },
  components: {
    Header,
  }
};
</script>

<style>
</style>
