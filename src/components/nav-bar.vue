<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">Navbar scroll</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item">
          <RouterLink class="nav-link text-white" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link text-white" to="/about">About</RouterLink>
        </li>

      </ul>

    </div>
  </div>
</nav>
  </header>
</template>
