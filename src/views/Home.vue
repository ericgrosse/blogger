<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.$router.push('/register')
  }
}
</script>
