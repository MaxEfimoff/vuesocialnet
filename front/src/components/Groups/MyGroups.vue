<template>
  <section class="section-center">
    <div class="section posts">
        <div class="friends-list padding">
            <ul  class="flex">
              <li>
                <router-link
                  to="/groups"
                >
                  All Groups
                </router-link>
              </li>
              <li>
                <router-link
                  to="/groups/my-groups"
                >
                  My Groups
                </router-link>
              </li>
              <li>
                <router-link
                  to="/groups/manage-groups"
                >
                  Manage Groups
                </router-link>
              </li>
            </ul>
            <router-link
              :to="`/groups/create-group`"
            >
              <button>Create new group</button>
            </router-link>
            <form action="#" class="post-new-form">
              <input type="text" placeholder="Group search" />
            </form>
          </div>
      <div class="post-wrapper">
        <div class="post" v-for="group in mygroups" :key="group.id">
          <div class="post-author">
            <router-link
              :to="`/groups/${group._id}`"
              class=" flex-left"
            >
              <div class="text-center"> 
                <img class="groups-img" src="../../assets/img/groups/01.jpg" alt="">
                <div><span>{{ group.subscribes.length }} Subscribers</span></div>
              </div>
              <div class="leftpadding">
                <div><span>{{ group.handle }}</span></div>
                <div><span>{{ group.info }}</span></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>  
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MyGroups',
  created() {
    this.getMyGroups();
  },
  computed: {
    ...mapState("groups",['mygroups']),
  },
  methods: {
    ...mapActions("groups",['getMyGroups']),
  },
}
</script>

<style>

</style>