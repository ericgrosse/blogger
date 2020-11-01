<template>
  <div class="home">
    <h1>Home</h1>
    <p>Welcome, {{username}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      //username: ''
    }
  },
  computed: {
    ...mapState(['username'])
  },
  created() {
    //this.$router.push('/register')
  }
}
</script>
