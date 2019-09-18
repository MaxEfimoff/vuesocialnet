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

input {
  border: 1px solid var(--primary-color);
  height: 2rem;
  background-color: var(--primary-color);
  border-radius: 0.2rem;
  padding: 0.5rem;
}

input:focus {
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
  color: var(--secondary-color);;
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

span, li, i {
  color: var(--secondary-color);;
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

.flex {
  display: flex;
  align-items: center;
}

.navbar {
  background-color: #b1b1b1;
  height: 50px;
  font-size: 1.2rem;
  padding: 0.3rem 0 0.3rem 0;
}

.navbar .container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  width: 100%;
  max-width: 15rem;
  display: inline-block;
  position: relative;
  line-height: 0;
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
  border: 1px solid rgb(230, 230, 230);
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  background-color: #fff;
}

.section-left {
  max-width: 234px;
}
.avatar-background {
  max-width: 232px;
  height: 181px;
  background-image: url("/assets/img/photos/unsplash_2.png");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}
.avatar {
  text-align: center;
  margin-top: -1.6rem;
}

.avatar img {
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
  margin-left: 2rem;
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

.post-new {
  width: 100%;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.post-new-form {
  margin-left: 1rem;
}

.post-new-form input{
  width: 20rem;
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

/* Transitions */
.slideup, .slidedown {
  max-height: 0;            
  overflow-y: hidden;
  transition: transform 1.5s ease-in-out;
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
  margin: auto;
}
</style>
