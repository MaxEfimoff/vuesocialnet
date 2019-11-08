<template>
  <section class="section-center">
    <div class=" posts">
      <div class="product-image" :style="{ backgroundImage: 'url(' + `${product.image}` + ')' }">
      </div>
      <div class="post-author">
        <router-link
          :to="`/profile/handle/${product.profile.handle}`">
          <div class="padding">
            <img class="product-photo" :src="product.profile.avatar" alt="">
            <p>{{ product.profile.handle }}</p>
          </div>
        </router-link>
          <div class="text-left">
            <span>{{ product.category.name }}</span>
            <div class="post-author">
              <div class="groups-photo">
                <p>{{ product.text }}</p>
              </div>
            </div>
            <i class="fas fa-thumbs-up" @click="addLike"></i>{{' '}}<span>{{ product.likes.length }}</span>
            <router-link v-if="this.productAuthor" class="padding" :to="`/products/${product._id}/edit-product`">
              <span class="halfpadding">Edit product</span>
            </router-link>
            <div class="error-message">
              {{this.errors.alreadyliked}}
            </div>
          </div>
      </div>
        <!-- Comments -->
        <div
          class="message"
          v-for="comment in product.comments"
          :key="comment.id"
        >
          <div class="flex-left-nowrap">
             <div>
              <router-link
                :to="`/profile/handle/${comment.name}`">
                <img class="groups-img" :src="comment.avatar" alt="">
                <div class='text-center'>
                  <span>{{ comment.name }}</span>
                </div>
              </router-link>
            </div>
            <div class="groups-photo">
              <a class="leftpadding">{{ comment.text }}</a>
            </div>
          </div>
        </div>
        <!-- Comments form -->
        <form ref="text" @submit.prevent="submitForm" class="post-new-form">
          <div class="halfpadding">
            <textarea
              class="textarea"
              placeholder="Coment"
              v-model="formData.text"
            />
          </div>
          <div class="padding">
            <button type="submit">Submit</button>
          </div>
        </form>
        <!-- Comments form -->
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Product',
  props: {
    id: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        avatar: this.$store.state.profile.profile.avatar
      },
    };
  },
  created() {
    this.getProductById(this.id);
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('products', ['product']),
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile' ]),
    productAuthor() {
      return this.$store.state.products.product.profile.handle === this.$store.state.profile.profile.handle;
    }
  },
  methods: {
    ...mapActions("products", ['getProductById']),
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    addLike() {
      this.$store.dispatch('products/addLike', this.id)
      .catch((error) => {console.log(error)})
    },
    submitForm() {
      const payload = {
        productId: this.id,
        formData: this.formData
      }
      this.$store.dispatch('products/addComment', payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)})
    },
  },
}
</script>

<style>

</style>