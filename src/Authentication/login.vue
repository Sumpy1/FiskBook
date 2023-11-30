<!-- Login.vue -->
<template>
    <div>
      <form @submit.prevent="login">
        <div class="title">Login</div>
        <input placeholder="Username" type="text" v-model="username" />
        <br />
        <input placeholder="Password" type="password" v-model="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { loginRest } from "./api";
  
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        loginRest(this.username, this.password)
          .then((response) =>
            this.$emit("onAuth", { ...response.data, secret: this.password })
          )
          .catch((error) => console.log("Login error", error));
      },
    },
  };
  </script>
  
  