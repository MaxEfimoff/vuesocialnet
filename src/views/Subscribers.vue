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
              <div class="post" v-for="subscriber in subscribers" :key="subscriber.id">
                <div class="post-author">
                  <div class="groups-photo lefthalfpadding">
                    <img class="groups-img" :src=" require(`@/assets/img/friends/${subscriber.url}`) " alt="">
                    <div class="leftpadding">
                        <div><a>{{ subscriber.name }}</a></div>
                        <div><a>{{ subscriber.school }}</a></div>
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
  name: 'subscribers',
  data() {
    return {
      subscribers: [
            {
              id: 1,
              name: "Max Zipper",
              url: "05.jpg",
              school: "Cambrige",
            },
            {
              id: 2,
              name: "Den Miller",
              url: "06.jpg",
              school: "University of Madrid",
            },
            {
              id: 3,
              name: "Ilia Moner",
              url: "02.jpg",
              school: "SCU",
            },
            {
              id: 4,
              name: "Alex Williams",
              url: "07.jpg",
              school: "Caltech",
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
