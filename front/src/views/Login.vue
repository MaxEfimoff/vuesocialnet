<template>
  <div>
    <Header />
    <div id="modal" class="modal">
    <div class="container-modal" id="container-modal" :class="{active: rightPanelActive}">
      <div class="form-container sign-up-container">
        <form @submit.prevent="submitRegisterForm">
          <h1>Use Account</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social" @click="logingoogle"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or register with your email</span>
          <!-- Name -->
          <input
            v-model="formRegisterData.name"
            @blur="$v.formRegisterData.name.$touch()"
            type="text"
            placeholder="Name"
            ref="name"
          />
          <div
            v-if="$v.formRegisterData.name.$error"
            class="form-error">
            <span
              v-if="!$v.formRegisterData.name.required"
              class="is-danger">
              Name is required
            </span>
            <span
              v-if="!$v.formRegisterData.name.minLength"
              class="is-danger">
              Name minimum length is 6 characters
            </span>
          </div>
          <div class="error-message">
            {{this.errors.name}}
          </div>
          <!-- E-mail -->
          <input
            v-model.trim="formRegisterData.email"
            @blur="$v.formRegisterData.email.$touch()"
            type="email"
            placeholder="Email Address"
            id="email"
            ref="email"
            />
          <div v-if="$v.formRegisterData.email.$error" class="form-error">
            <span v-if="!$v.formRegisterData.email.required" class="is-danger">Email is required</span>
            <span v-if="!$v.formRegisterData.email.email" class="is-danger">Email address is not valid</span>
          </div>
          <div class="error-message">
            {{this.errors.email}}
          </div>
          <!-- Password -->
          <input
            v-model.trim="formRegisterData.password"
            @blur="$v.formRegisterData.password.$touch()"
            type="password"
            ref="password"
            placeholder="Your Password"
          />
          <div v-if="$v.formRegisterData.password.$error" class="form-error">
            <span v-if="!$v.formRegisterData.password.required" class="is-danger">Password is required
            </span>
            <span
              v-if="!$v.formRegisterData.password.minLength"
              class="is-danger">Password minimum length is 6 characters
            </span>
          </div>
          <div class="error-message">
            {{this.errors.password}}
          </div>
          <!-- Password2 -->
          <input
            v-model.trim="formRegisterData.password2"
            @blur="$v.formRegisterData.password2.$touch()"
            type="password"
            placeholder="Confirm Password"
            ref="password2"
            autocomplete="off"
          />
          <div
            v-if="$v.formRegisterData.password2.$error"
            class="form-error">
            <span
              v-if="!$v.formRegisterData.password2.required"
              class="is-danger">Password Confirmation is required</span>
            <span
              v-if="!$v.formRegisterData.password2.sameAs"
              class="is-danger">Password confirmation should be the same as password</span>
          </div>
          <div class="error-message">
            {{this.errors.password2}}
          </div>
          <button
            type="submit"
            :disabled="$v.formRegisterData.$invalid">
            Register
          </button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="submitForm">
          <h1>Log in</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social" @click="logingoogle"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input
            v-model.trim="formData.email"
            @blur="$v.formData.email.$touch()"
            type="email"
            placeholder="Your Email Address"
            ref="email"
          />
          <div v-if="$v.formData.email.$error" class="form-error">
            <span v-if="!$v.formData.email.required" class="is-danger">Email is required</span>
            <span v-if="!$v.formData.email.email" class="is-danger">Email address is not valid</span>
          </div>
          <div class="error-message">
            {{this.errors.userNotFound}}
          </div>
          <input
            v-model.trim="formData.password"
            @blur="$v.formData.password.$touch()"
            type="password"
            ref="password"
            placeholder="Your Password"
            outlined
            autocomplete="current-password"
          />
          <div v-if="$v.formData.password.$error" class="form-error">
            <span v-if="!$v.formData.password.required" class="help is-danger">Password is required</span>
            <span
              v-if="!$v.formData.password.minLength"
              class="is-danger">Password minimum length is 6 characters
            </span>
          </div>
          <div class="error-message">
            {{this.errors.password}}
          </div>
          <a href="#">Forgot your password?</a>
          <button
            type="submit"
            :disabled="$v.formData.$invalid">
            Log in
          </button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay-modal">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn" @click="rightPanelActive=!rightPanelActive">Log in</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button @click="rightPanelActive=!rightPanelActive" class="ghost" id="signUp">Register</button>
          </div>
        </div>
      </div>
    </div>
  <span class="close" id="close">&times;</span>
  </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from "vuex";
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators';

import Header from '@/components/Header.vue';

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '162155419024-ct4f6h85fa5juklis6ird1eqvqs4e129.apps.googleusercontent.com',
}
Vue.use(GAuth, gauthOption)

export default {
  name: 'Login',
  data() {
    return {
      formRegisterData: {
        email: '',
        password: '',
        password2: '',
        name: '',
      },
      formData: {
        email: '',
        password: '',
      },
      rightPanelActive: false
    };
  },
  validations: {
    formData: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    formRegisterData: {
      name: {
        required,
        minLength: minLength(6)
      },
      email: {
        email,
        required,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password2: {
        required,
        minLength: minLength(6),
        sameAs: sameAs('password')
      }
    }
  },
  computed: {
    ...mapState('errors', ['errors']),
  },
  methods: {
    logingoogle() {
      this.$gAuth.signIn()
        .then(GoogleUser => {
          this.$store.dispatch('auth/loginViaGoogle', GoogleUser.Zi.access_token)
        })
        .catch(error => {
          console.log(error)
        })
    },
    submitRegisterForm() {
        this.$store.dispatch('auth/register', this.formRegisterData)
          .then(this.rightPanelActive = false)
          .then(() => this.$router.push({ name: 'login' }))
          .catch((error) => {
            console.log(error)
          });
    },
    submitForm() {
      this.$store.dispatch('auth/login', this.formData)
        .then(() => this.$router.push({ name: 'dashboard' }))
        .catch((error) => {console.log(error)
      })
    },
  },
  components: {
    Header,
  }
};
</script>

<style scoped>
button {
  border-radius: 1.2rem;
  border: 1px solid #b1b1b1;
  background: #b1b1b1;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 0.6rem;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

h1, h2, h3, h4 {
  line-height: 1.3;
}

p {
  font-size: 1rem;
  font-weight: 100;
  line-height: 1.5rem;
  letter-spacing: 0.5px;
  margin: 1.2rem 0 1.8rem;
}

a {
  color: var(--secondary-color);
  text-decoration: none;
  margin: 0.6rem 0 0.2rem 0;
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 30px;
}

.btn:hover {
  background: var(--secondary-color);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--overlay-color);
}


.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 110%;
  overflow: auto;
}

.container-modal {
  background: #fff;
  border-radius: 0.7rem;
  box-shadow: 0 0.8rem 1.8rem rgba(0, 0, 0, 0.15), 0 0.4rem 0.4rem rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 98%;
  min-height: 480px;
  margin: 15% auto;
  padding: 20px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay-modal {
  background: #666666;
  background: linear-gradient(to right, #b1b1b1, #666666) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.overlay-left {
  transform: translateX(-20%);
}

.social-container {
  margin: 1.2rem 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.3rem;
  height: 2.5rem;
  width: 2.5rem;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 0.7rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
  border-radius: 0.5rem;
}

.form-container input:focus {
  outline: none;
}

.is-danger {
  color: red;
}

/* Animation */
.container-modal.active .sign-in-container{
  transform: translateX(100%);
}

.container-modal.active .overlay-container{
  transform: translateX(-100%);
}

.container-modal.active .sign-up-container{
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.container-modal.active .overlay-modal {
  transform: translateX(50%);
}

.container-modal.active .overlay-left {
  transform: translateX(0);
}

.container-modal.active .overlay-right {
  transform: translateX(20%);
}
</style>
