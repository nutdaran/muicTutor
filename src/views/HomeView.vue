<template>
  <ImageSlider />
  <div>
    <main>
      <h1>Home</h1>
      <v-icon>mdi-home</v-icon>
      <RouterLink to="/tutor">
        <button style="color: black;">Go to Tutor Details</button>
      </RouterLink>
    </main>
  </div>
</template>

<script setup>
import ImageSlider from '../components/ImageSlider.vue';
import { RouterLink } from 'vue-router'
</script>
