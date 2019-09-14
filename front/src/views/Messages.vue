<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <section class="section-center">
          <!-- Posts -->
          <div class="section posts">
            <div class="post-new noleftpadding">
              <form action="#" class="post-new-form">
                <input type="text" placeholder="Search" />
              </form>
            </div>
              <div class="post" v-for="message in messages" :key="message.id">
                <div class="post-author">
                  <div class="groups-photo">
                    <img class="groups-img" :src=" require(`@/assets/img/friends/${message.url}`) " alt="">
                    <a class="leftpadding">{{ message.name }}</a>
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
  name: 'messages',
  data() {
    return {
      messages: [
            {
              id: 1,
              name: "Dan Newman",
              url: "03.jpg",
            },
            {
              id: 2,
              name: "Max Miller",
              url: "01.jpg",
            },
            {
              id: 3,
              name: "Zack New",
              url: "02.jpg",
            },
            {
              id: 4,
              name: "John Williams",
              url: "04.jpg",
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
