<template>
  <div class="home">
    <div class="create-post">
      <h1>Home</h1>
      <p>Welcome, {{user.username}}</p>
      <button v-on:click="createPost">Create Post</button>
    </div>
    <div class="list-posts">
      <div class="post-container" v-for="(post, index) in user.posts" :key="index">
        <h3>{{post.title}}</h3>
        <p>{{post.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      user: {
        username: '',
        userId: '',
        posts: [],
      }
    }
  },
  methods: {
    createPost() {
      this.$router.push('/create-post')
    }
  },
  /*computed: {
    ...mapState(['user'])
  },*/
  created() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      this.$router.push('/login')
    }
    else {
      this.user = user
    }
  },
  async mounted() {
    let res = await axios.get(`http://localhost:3000/user/${this.user.userId}`)
    this.user = {
      username: res.data.username,
      userId: res.data.userId,
      posts: res.data.posts
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.list-posts {
  margin: 16px;
}

.post-container {
  border: 1px solid black;
  margin: 8px 0;
}
</style>
