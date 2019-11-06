<template>
  <transition name="dropdown-fade">
    <div class="block section">
      <ul class="margin">
        <li
          v-for="(item, index) in listItems"
          :key="index"
          class="bottomhalfpadding"
        >
          <router-link
          :to="`${item.link}`">
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </transition >
</template>

<script>
export default {
  props: {
    listItems: Array
  }
}
</script>

<style scoped>

.block{
  width: 200px;
  color:#333;
  border:1px solid #eee;
  position: absolute;
  left: 3rem;
  top: 4rem;
}

.block:before, .block:after{
  content:'';
  position: absolute;
  margin: -16px;
  left: 50%;
  margin-left:-4.8rem;
}

.block:after{
  top:0;
  border: 8px solid transparent;
  border-bottom: 8px solid #fff;
}

.block:before{
  top:-1px;
  border: 8px solid transparent;
  border-bottom: 8px solid #eee;
}

.dropdown-fade-enter-active, .dropdown-fade-leave-active {
    transition: all .1s ease-in-out;
  }

.dropdown-fade-enter, .dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>