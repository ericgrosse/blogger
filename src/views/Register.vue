<template>
  <div class="register">
    <h1>Register</h1>
    <div class="register-inputs">
      <input type="text" v-model="username" placeholder="Username">
      <input type="text" v-model="password" placeholder="Password">
      <input type="text" v-model="password2" placeholder="Confirm password">
      <button v-on:click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
    }
  },
  methods: {
    async submit() {
      const res = await axios.post('http://localhost:3000/user/register', {
        username: this.username,
        password: this.password,
      })
      
      this.$store.commit('updateUser', {
        username: res.data.username,
        userId: res.data.userId
      })
      
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>

.register {
  max-width: 300px;
  margin: 0 auto;
  
  h1 {
    text-align: center;
  }
}

.register-inputs {
  display: flex;
  flex-direction: column;
}
</style>