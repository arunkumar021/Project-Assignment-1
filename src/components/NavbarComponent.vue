<template>
  <nav class="navbar navbar-expand-lg  p-3 bg-info text-dark text-danger navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand text-color " href="#">TODO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- navbar links -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item  mx-1 text-end">
            <router-link class="nav-link active" :to="{name: 'Home'}">Home</router-link>
        </li>
         <li class="nav-item  mx-1 text-end">
              <router-link class="nav-link active" :to="{name: 'Login'}">Login</router-link>
        </li>
         <li class="nav-item  mx-1 text-end">
              <router-link class="nav-link active" :to="{name: 'Register'}">Register</router-link>
        </li>
         <!-- <li class="nav-item">
              <router-link class="nav-link active" :to="{name: 'Dashboard'}">Dashboard</router-link>
        </li> -->
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name:'NavbarComponent',
}
</script>
