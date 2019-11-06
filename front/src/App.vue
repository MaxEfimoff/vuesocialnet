<template>
  <div id="app">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';



export default {
  created() {
  // Check for token in local storage
  if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  this.$store.commit('auth/setUser', decoded);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    this.$store.dispatch('auth/logout');
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}
  }
  
}
</script>

<style>
:root {
  --primary-color: #eee;
  --secondary-color: #8b8b8b;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  font-size: 0.9rem;
  background-color: var(--primary-color);
}

input[type='text'] {
  text-align:right;
  border: 1px solid var(--primary-color);
  height: 2rem;
  background-color: var(--primary-color);
  border-radius: 0.2rem;
}


select {
  width: 100%;
  text-align:right;
  border: 1px solid var(--primary-color);
  height: 2rem;
  background-color: var(--primary-color);
  border-radius: 0.2rem;
}

input {
  border: 1px solid var(--primary-color);
  height: 2rem;
  width: 100%;
  background-color: var(--primary-color);
  border-radius: 0.2rem;
  padding: 0.5rem;
  text-align:right;
}

input:focus {
  outline: none;
}

textarea:focus {
  outline: none;
}

h1, h2, h3, h4 {
  line-height: 1.3;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: var(--secondary-color);
}

button {
  border-radius: 0.2rem;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: var(--secondary-color);
  padding: 0.5rem 1.5rem;
}

button:focus {
  outline: none;
}

button:hover {
  background: rgb(228, 228, 228);
  color: var(--secondary-color);
}

span, li, i {
  color: var(--secondary-color);
  font-size: 0.8rem;
}

.relative{
  position: relative;
}

.textarea {
  text-align:left;
  border: 1px solid var(--primary-color);
  height: 7rem;
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

.input-file {
    opacity: 0;
    width: 100%;
    height: 10rem;
    position: absolute;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

.white-font {
  color: #fff;
  text-shadow: 1px 1px 2px #333;
}

.white-font-no-shadow {
  color: #fff;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 0.7rem;
}

.error {
  border: 1px solid salmon;
  background-color: salmon;
}

.abs {
  position: absolute;
}

.is-active {
  font-weight: bold;
}

.rel {
  position: relative;
}

.margin {
  margin: 1rem;
}

.leftmargin {
  margin-left: 1rem;
}

.padding {
  padding: 1rem;
}

.halfpadding {
  padding: 0.5rem;
}

.noleftpadding {
  padding: 1rem 1rem 1rem 0;
}

.leftpadding {
  padding-left: 1rem;
}

.lefthalfpadding {
  padding-left: 0.5rem;
}

.bottomhalfpadding:not(:last-child) {
  padding-bottom: 0.5rem;
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.flex-left {
  display: flex;
  flex-wrap: wrap;
}

.flex-left-nowrap {
  display: flex;
  flex-wrap: nowrap;
}

.display-image {
	height: 250px;
}

.display-image-large{
  width: 100%;
}

.navbar {
  background-color: rgb(252, 252, 252);
  height: 50px;
  font-size: 1.2rem;
  padding: 0.3rem 0 0.3rem 0;
  border-bottom: 1px solid rgba(var(--b6a,219,219,219),1);
}

.navbar .container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1rem;
}

.navbar .nav {
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
}

.navbar .logo {
  font-size: 2rem;
  color: #fff;
  margin-left: 3rem;
}

.navbar .nav {
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-form {
  max-width: 15rem;
  display: inline-block;
  position: relative;
  line-height: 0;
  margin-left: auto;
}

.search-form .form-control {
  display: inline-block;
  border: 0;
  outline: 0;
  font-size: 1rem;
  background-color: transparent;
  font-family: inherit;
  padding: 0 3rem 0 1.5rem;
}

.search-input {
  padding-right: 2.2rem;
}

/* .register-input {
  background-color: #fff;
} */

.search-form .submit {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  background-color: var(--primary-color);
  font-size: 1rem;
  text-align: center;
  margin: 0;
  padding: 0;
  outline: 0;
  border: 0;
  color: var(--secondary-color);
  cursor: pointer;
  border-radius: 1rem;
}

/*Sections*/
.main{
  margin: 1rem 0;
}

.container-main {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1rem;
}

.section {
  border-color:#fff;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  background-color: #fff;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 4px 0px;
  z-index: 999;
}

.section-left, .section-right {
  max-width: 234px;
}

.avatar-background {
  max-width: 100%;
  min-height: 181px;
  background-image: url("/assets/img/photos/unsplash_2.png");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}

.profile-background {
  width: 100%;
  object-fit: cover;
  max-height: 484px;
  min-height: 420px;
  background-image: url("/assets/img/photos/unsplash_2.png");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: 100% 100%;
  border-radius: 0.3rem 0.3rem 0 0;
}

.avatar {
  text-align: center;
  margin-top: -1.6rem;
}

.avatar img {
  max-width: 200px;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important;
}

.avatar-wide{
  text-align: center;
  margin-top: -10rem;
  max-width: 200px;
  border-radius: 50%;
  border: 3px solid #fff;
  height: 100px;
  width: 100px;
}

.edit-profile {
  margin-top: 0.3rem;
  text-align: center;
}

.profile {
  position: absolute;
  top: 10rem;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

/* Friends */
.friends {
  padding: 0.5rem 1rem 0.5rem 1rem;
}

.friends-photo {
  border-radius: 50%;
  border: 3px solid #fff;
  margin-right: -1rem;
  height: 50px;
  width: 50px;
}

/* Groups */
.groups {
  padding: 0.5rem 1rem 0.8rem 1rem;
}

.groups-wrapper {
  margin-top: 0.4rem;
}

.groups-photo {
  justify-self: flex-end;
  display: flex;
  align-items: center;
  margin: 0.4rem 0 0 0;
}

.groups-img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.groups-photo span {
  margin-left: 1rem;
}

.group-template {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 1rem;
}

.group-background {
  height: 300px;
  background-size: 100% auto;
  border-radius: 0.3rem 0.3rem 0 0;
  background-repeat: no-repeat;
}

.group-avatar {
  margin-top: 2rem;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important;
}

/* Photos */
.photos {
  padding: 0.5rem 1rem 0.5rem 1rem;
}

.photos-wrapper {
  margin-top: 0.4rem;
}

.photos-photo {
  position: relative;
  margin-top: 0.4rem;
}
.photo-img {
  width: 200px;
  border-radius: 4px;
}

.photos-photo span {
  margin: 0 0 0.8rem 0.8rem;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}

.delete-photo {
  top: 2rem;
  right: 2rem;
}

.photo-small {
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-align: left;
}

/* Section center */
.section.section-center {
  padding: 0;
}

/* Info */
.name {
  margin: 1rem;
}

.personal-info {
  margin-bottom: 0.5rem;
}

.education {
  border-top: 1px solid #eee;
  width: 100%;
  justify-self: flex-end;
  display: flex;
  align-items: center;
}

.education span {
  margin-left: auto;
}

.show-more {
  text-align: center;
}


/* Stats */
.stats {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0.5rem 0 0 0;
}

.stat-counter {
  text-align: center;
}

.stat-counter .count {
  color: var(--secondary-color);;
  font-size: 1rem;
}

.stat-counter span {
  padding: 0rem 1rem 1rem 1rem;
}

/* Posts */
.posts {
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
}

.avatar-posts {
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

.post-author{
  display: flex;
  align-items: center;
}

.post-new {
  width: 100%;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.post-new-form {
  margin: 0 1rem 0 1rem;
}

.message-new-form {
  margin: 0.8rem 1rem 0 1rem;
}

.post-new-form input{
  padding-right: 1rem;
}

.post-wrapper {
  width: 100%;
}

.posts-list {
  display: flex;
  border-bottom: 1px solid #eee;
  width: 100%;
}

.posts li {
  margin-right: 1rem;
}

.post {
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.post-text {
  margin-top: 0.5rem;
}

/* Products */
.product-image {
  height: 300px;
  background-size: auto 300px;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 0.3rem 0.3rem 0 0;
}
.product-card {
  height: 300 px;
  width: 200px;
}

.product-card-image {
  height: 200px;
  max-width: 184px;
  border-radius: 0.3rem;
  text-align: center;
  object-fit: cover;
}

.product-photo {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

/* Messages */
.message-header {
  width: 100%;
  border-bottom: 1px solid #eee;
}

.message {
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem 0.5rem 1rem;
}

/* Transitions */
.slideup, .slidedown {
  max-height: 0;            
  overflow-y: hidden;
}
.slidedown {            
  max-height: 260px ;                    
} 

.friends-slideup, .friends-slidedown {
  max-height: 0;            
  overflow-y: hidden;
  transition: transform 1.5s ease-in-out;
}
.friends-slidedown {            
  max-height: 160px ;                    
} 

.groups-slideup, .groups-slidedown {
  max-height: 0;            
  overflow-y: hidden;
  transition: transform 1.5s ease-in-out;
}
.groups-slidedown {            
  max-height: 160px ;                    
} 

.photos-slideup, .photos-slidedown {
  max-height: 0;            
  overflow-y: hidden;
  transition: transform 1.5s ease-in-out;
}
.photos-slidedown {            
  max-height: 160px ;                    
} 

.friends-list {
  display: flex;
  border-bottom: 1px solid #eee;
}

.register {
  width: 500px;
  min-height: 250px;
  margin: 5rem auto;
}

.avatar-font {
  height: 180px;
  background-size: 100% 100%;
  border-radius: 0.3rem 0.3rem 0 0;
}

.container-slider {
  transition: opacity 0.2s;
}

/* Media queries */
@media(max-width: 800px) {
  .container-main {
    display: grid;
    grid-template-columns: 4fr;
  }

  .section-left {
    display: none;
  }
}
</style>
