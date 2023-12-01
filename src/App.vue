<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped>
header {
  padding: 0.5rem;
}

main {
    margin-top: 3rem;
    margin-left: 8rem;
    margin-right: 8rem;
    margin-bottom: 3rem;
  }

</style>
