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
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or register with your email</span>
          <input
            type="text"
            v-model="formRegisterData.name"
            placeholder="Name"
            ref="name"
          />
          <div class="error-message">
            {{this.errors.name}}
          </div>
          <input
            type="text"
            placeholder="Email Address"
            v-model="formRegisterData.email"
            id="email"
            ref="email"
            />
          <div class="error-message">
            {{this.errors.email}}
          </div>
          <input
            type="password"
            ref="password"
            placeholder="Password"
            v-model="formRegisterData.password"
          >
          <div class="error-message">
            {{this.errors.password}}
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            ref="password2"
            v-model="formRegisterData.password2"
          >
          <div class="error-message">
            {{this.errors.password2}}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="submitForm">
          <h1>Log in</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Email Address"
            v-model="formData.email"
            ref="email"
          />
          <div class="error-message">
            {{this.errors.email}}
          </div>
          <input
            type="password"
            ref="password"
            placeholder="Password"
            outlined
            v-model="formData.password"
          />
          <div class="error-message">
            {{this.errors.password}}
          </div>
          <a href="#">Forgot your password?</a>
          <button type="submit">Log in</button>
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
import { mapState } from "vuex";
import Header from '@/components/Header.vue'

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
  computed: {
    ...mapState('errors', ['errors']),
  },
  methods: {
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
