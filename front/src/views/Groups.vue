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
                    <img class="groups-img" src="../assets/img/groups/01.jpg" alt="">
                    <span>{{ group.handle }}</span>
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
import { mapState, mapActions } from 'vuex';

// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'

export default {
  name: 'groups',
  data() {
    return {
    }
  },
  created() {
    this.getGroups();
  },
  computed: {
    ...mapState("groups",['groups']),
  },
  methods: {
    ...mapActions("groups",['getGroups']),
  },
  components: {
    Header,
    LeftSection,
  }
}
</script>
