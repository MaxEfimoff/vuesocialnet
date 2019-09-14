<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <section class="section-center">
          <!-- Posts -->
          <div class="section posts">
              <div class="friends-list padding">
                <ul  class="flex">
                  <li>
                    <a href="">Friends</a>
                  </li>
                  <li>
                    <a href="">Friends online</a>
                  </li>
                </ul>
                <form action="#" class="post-new-form">
                  <input type="text" placeholder="Friends search" />
                </form>
              </div>
              <div class="post" v-for="friend in friends" :key="friend.id">
                <div class="post-author">
                  <div class="groups-photo lefthalfpadding">
                    <img class="groups-img" :src=" require(`@/assets/img/friends/${friend.url}`) " alt="">
                    <div class="leftpadding">
                        <div><a>{{ friend.name }}</a></div>
                        <div><a>{{ friend.school }}</a></div>
                      </div>
                  </div>
                  <a>Messages </a>
                </div>
              </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'

export default {
  name: 'friends',
  data() {
    return {
      friends: [
            {
              id: 1,
              name: "Dan Newman",
              url: "03.jpg",
              school: "UdSU",
            },
            {
              id: 2,
              name: "Max Miller",
              url: "01.jpg",
              school: "UGR",
            },
            {
              id: 3,
              name: "Zack New",
              url: "02.jpg",
              school: "Oxford",
            },
            {
              id: 4,
              name: "John Williams",
              url: "04.jpg",
              school: "Harvard",
            },
          ]
    }
  },
  components: {
    Header,
    LeftSection
  }
}
</script>
