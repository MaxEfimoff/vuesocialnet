<template>
  <div>
    <button href="" @click.prevent="show">Send message</button>
    <modal name="ModalProfile">
      <SendMessage
        :formData="formData"
        :onSubmit="submitForm"
        @change="onChange" />
    </modal>
  </div>
</template>

<script>
import SendMessage from '../helpers/SendMessage';
export default {
  methods: {
    show() {
      this.$modal.show('ModalProfile');
    },
    hide() {
      this.$modal.hide('ModalProfile');
    },
    onChange(newFormData) {
      this.formData = newFormData;
    },
    submitForm() {
      const newData = Object.assign({}, this.formData);

      this.$store.dispatch('messages/addMessage', newData)
        .then(() => this.$router.push({ name: 'messages' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    SendMessage
  },
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        nameAvatar: this.$store.state.profile.profile.avatar,
        recipient: this.$store.state.profile.anotherUserProfile.handle,
        recipientAvatar: this.$store.state.profile.anotherUserProfile.avatar,
      },
    };
  },
}
</script>

<style>

</style>