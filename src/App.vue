<script setup>
import Authentication from "/Users/sumiran/Chatapp/src/Authentication/index.vue";
import Chat from "/Users/sumiran/Chatapp/src/Chat/index.vue";

</script>


<template>
  <Authentication v-if="!user" @onAuth="handleAuth" />
  <Chat
    v-else
    v-bind:username="user.username"
    v-bind:secret="user.secret"
  />
</template>

<script>
export default {
  data() {
    return {
      user: undefined,
    };
  },
  methods: {
    handleAuth(user) {
      this.user = user;
    },
  },
};


</script>

