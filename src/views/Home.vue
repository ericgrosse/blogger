<template>
  <div class="home">
    <h1>Home</h1>
    <p>Welcome, {{user.username}}</p>
    <button v-on:click="createPost">Create Post</button>
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
  methods: {
    createPost() {
      this.$router.push('/create-post')
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    //this.$router.push('/register')
  }
}
</script>
