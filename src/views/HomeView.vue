<template>
  <NavBar />
  <div>
    <main>
      <h1>Home</h1>
      <RouterLink to="/tutor">
        <button style="color: black;">Go to Tutor Details</button>
      </RouterLink>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
</script>
