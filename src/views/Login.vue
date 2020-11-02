<template>
  <div class="login">
    <h1>Login</h1>
    <div class="login-inputs">
      <input type="text" v-model="username" placeholder="Username">
      <input type="text" v-model="password" placeholder="Password">
      <button v-on:click="submit">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async submit() {
      const res = await axios.post('http://localhost:3000/user/login', {
        username: this.username,
        password: this.password,
      })

      const savedUser = {
        username: res.data.username,
        userId: res.data.userId,
        posts: res.data.posts,
      }
      
      //this.$store.commit('updateUser', savedUser)
      localStorage.setItem('user', JSON.stringify(savedUser));
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>

.login {
  max-width: 300px;
  margin: 0 auto;
  
  h1 {
    text-align: center;
  }
}

.login-inputs {
  display: flex;
  flex-direction: column;
}
</style>