<template>
  <section class="section-center">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li v-for="item in topMenu" :key="item.name">
            <a href="">{{ item.name }}</a>
          </li>
        </ul>
        <form action="#" class="post-new-form">
          <input type="text" placeholder="Posts search" />
        </form>
      </div>
      <div class="post" v-for="post in postsList" :key="post.id">
        <div class="post-author">
          <div class="groups-photo">
            <img class="groups-img" :src=" require(`@/assets/img/groups/${post.url}`) " alt="">
            <span>{{ post.groupName }}</span>
          </div>
        </div>
        <div class="post-text">
          {{ post.content }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topMenu: [
        {
          name: "All Posts"
        },
        {
          name: "My Posts"
        },
        {
          name: "Friends Posts"
        },
        {
          name: "Recommended"
        },
        {
          name: "Liked"
        },
      ],
      postsList: [
        {
          id: 1,
          url: "03.jpg",
          groupName: "Formula 1",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quasi rerum, illo velit culpa sunt neque suscipit, eos voluptatibus consectetur corrupti maxime eaque tempora. Laboriosam perspiciatis dicta obcaecati ad aliquid aspernatur magni. Suscipit, neque esse optio ab facere sunt unde!"
        },
        {
          id: 2,
          url: "01.jpg",
          groupName: "Garden design",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quasi rerum, illo velit culpa sunt neque suscipit, eos voluptatibus consectetur corrupti maxime eaque tempora."
        },
        {
          id: 3,
          url: "02.jpg",
          groupName: "Cafe racer",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quasi rerum, illo velit culpa sunt neque suscipit, eos voluptatibus consectetur corrupti maxime eaque tempora. Laboriosam perspiciatis dicta obcaecati ad aliquid aspernatur magni. Suscipit"
        },
        {
          id: 4,
          url: "04.jpg",
          groupName: "Odlo",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quasi rerum, illo velit culpa sunt neque suscipit, eos voluptatibus consectetur corrupti maxime eaque tempora. Laboriosam perspiciatis dicta obcaecati ad aliquid aspernatur magni. Suscipit, neque esse optio ab facere sunt unde!"
        },
      ]
    }
  }
}
</script>

<style>

</style>