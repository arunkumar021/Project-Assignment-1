<template>
 <div class="row">
   <div class="col-md-6 offset-md-3" >
       <div>
    <div>
      <h3 class=" font-weight-bold d-flex justify-content-center">Login</h3>
      <hr>
    </div>
    <form @submit.prevent = "login">

      <!-- <div  class="alert alert-success" role="alert">
          {{message}}
      </div> -->

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model=" userData.username"/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="userData.password" />
      </div>
      <div class="my-3 form-group d-flex justify-content-center">
        <button type="submit" class="btn btn-primary" @click="login" >Login</button>
      </div>
    </form>
  </div>
   </div>
 </div>

</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        userData : {
         username: "",
         password: "",
         message: "",
         isLog: false,
        },
      }
    },
    methods: {
     async login() {
        // console.log(this.userData)
        let result = await axios.post("http://localhost:3000/login" , this.userData)
        console.log(result.data);
        if(result.data === true) {
          this.$router.push('/dashboard');
        }
        else {
          this.message = "error"
          isLogged(result);
        }
        
      }
    },
   
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
  
  
</style>