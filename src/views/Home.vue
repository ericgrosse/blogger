<template>
  <div class="home">
    <div class="create-post">
      <h1>Home</h1>
      <p>Welcome, {{user.username}}</p>
      <button v-on:click="createPost">Create Post</button>
    </div>
    <div class="list-posts">
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      
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

<style lang="scss" scoped>

</style>
