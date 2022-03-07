<template>
   <div class="row">
   <div class="col-md-6 offset-md-3" >
       <div>
    <div>
      <h3 class="font-weight-bold d-flex justify-content-center">Register</h3>
      <hr>
    </div>
    <form @submit.prevent>
        <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" required v-model="userData.email"/>
      </div>
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" required v-model="userData.username" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" required v-model="userData.password"/>
      </div>
      <div class="my-3 form-group d-flex justify-content-center">
        <button type="submit" class="btn btn-primary" v-on:click="register">Register</button>
      </div>
    </form>
  </div>
   </div>
 </div>

</template>

<script>
import axios from 'axios';
export default {
     data() {
       return {
         userData :{
          email: "",
         username: "",
         password: "",
        }
       }
     },
     methods: {
      async register() {
        let result = await axios.post("http://localhost:3000" , this.userData)
        console.log(result)
        if(result.data === true) {
          this.$router.push('/login');
        }
        else{
          this.$router.push('/register');
        }
       }
     }
     
}
</script>

<style scoped>
  .col-md-6{
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .row{
    text-align: center;
  }
  form{
    padding: 5px;
  }
</style>