<template>
  <div>
    <Header />
    <div class="register padding">
      <section class="section posts">
        <h2 class="padding">Login</h2>
        <form @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <input
              required
              type="text"
              class="register-input"
              placeholder="Email Address"
              v-model="formData.email"
              id="email"
              ref="email"
            />
          </div>
          <div class="halfpadding">
            <input
              required
              type="text"
              ref="password"
              placeholder="Password"
              class="register-input"
              outlined
              v-model="formData.password"
            >
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
import { mapActions } from "vuex";

import Header from '@/components/Header.vue'
// import { emailValidationMixin } from '../components/helpers/mixins';

export default {
  name: 'Login',
  // mixins: [emailValidationMixin],
  data() {
    return {
      formData: {
        email: '',
        password: '',
        errors: {},
      },
      tab: 'Login',
    };
  },
  methods: {
    // ...mapActions("user", ["login"]),
    submitForm() {
        // this.login(this.formData)
          this.$store.dispatch('user/login', this.formData)
          // .then(() => this.$router.push({ name: 'booking' }))
          // .catch((error) => {console.log(error)
          // });
      // }
    },
  },
  components: {
    Header,
  }
};
</script>

<style>
</style>
