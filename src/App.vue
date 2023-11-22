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

#title {
  font-family: "Rubik-Bold";
  font-size: 30px;
  color: white;
}
#text {
  font-family: "Rubik-Regular";
  font-size: 14px;
  color: white;
}

</style>
