<template>
  <div class="register">
    <h1>Register</h1>
    <div class="register-inputs">
      <input type="text" placeholder="Username">
      <input type="text" placeholder="Password">
      <input type="text" placeholder="Confirm password">
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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