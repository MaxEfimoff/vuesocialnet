<template>
  <div>
    <Header />
    <div class="register padding">
      <section class="section posts">
        <h2 class="padding">Registration</h2>
        <form @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <input
              required
              type="text"
              class="register-input"
              v-model="formData.name"
              placeholder="Name"
              ref="name"
            />
          </div>
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
          <div class="halfpadding">
            <input
              required
              type="text"
              placeholder="Confirm Password"
              class="register-input"
              ref="password2"
              v-model="formData.password2"
            >
          </div>
          <div class="padding">
            <input type="submit"/>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
// import { emailValidationMixin } from '../components/helpers/mixins';

export default {
  name: 'Register',
  // mixins: [emailValidationMixin],
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
  methods: {
    submitForm() {
      // this.$refs.email.validate();
      // this.$refs.password.validate();
      // this.$refs.password2.validate();
      // this.$refs.name.validate();
      // if (
      //   !this.$refs.email.hasError
      //   && !this.$refs.password.hasError
      //   && !this.$refs.password2.hasError
      //   && !this.$refs.name.hasError
      //   && this.$refs.password.value === this.$refs.password2.value
      // ) {
        this.$store.dispatch('user/register', this.formData)
          // .then(() => this.$router.push({ name: 'booking' }))
          .catch((error) => {console.log(error)
          });
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
