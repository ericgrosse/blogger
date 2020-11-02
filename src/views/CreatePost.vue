<template>
  <div class="create-post">
    <h1>Create Blog Post</h1>
    <div class="main-content">
      <input v-model="title" type="text" placeholder="Title">
      <textarea v-model="content" cols="50" rows="3" placeholder="Content"></textarea>
      <button v-on:click="submitPost">Submit</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'CreatePost',
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    async submitPost() {
      await axios.post(`http://localhost:3000/posts`, {
        title: this.title,
        content: this.content,
        userId: this.user.userId,
      })
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['user'])
  },
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.create-post {
  max-width: 300px;
  margin: 0 auto;
}

.main-content {
  display: flex;
  flex-direction: column;
}
</style>