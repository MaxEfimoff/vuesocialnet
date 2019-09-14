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
                      <a href="">Group</a>
                    </li>
                    <li>
                      <a href="">Group online</a>
                    </li>
                  </ul>
                  <button>Create new group</button>
                  <form action="#" class="post-new-form">
                    <input type="text" placeholder="Group search" />
                  </form>
                </div>
            <div class="post-wrapper">
              <div class="post" v-for="group in groups" :key="group.id">
                <div class="post-author">
                  <div class="groups-photo">
                    <img class="groups-img" :src=" require(`@/assets/img/groups/${group.url}`) " alt="">
                    <span>{{ group.name }}</span>
                  </div>
                </div>
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
  name: 'groups',
  data() {
    return {
      groups: [
            {
              id: 1,
              name: "Formula 1",
              url: "01.jpg",
            },
            {
              id: 2,
              name: "Canyon bikes",
              url: "02.jpg",
            },
            {
              id: 3,
              name: "Garden design",
              url: "03.jpg",
            },
            {
              id: 4,
              name: "Cafe racer",
              url: "04.jpg",
            },
          ]
    }
  },
  components: {
    Header,
    LeftSection,
  }
}
</script>
