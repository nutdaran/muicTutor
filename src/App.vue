<script setup>
import { RouterView } from 'vue-router'
// import NavBar from '@/components/NavBar.vue'
// import { auth } from '@/firebase/firebase.js'
// import { onMounted } from 'vue';

// const currentUser = auth.currentUser

// onMounted(() => {
//   if (currentUser==null){
//       console.log("No user is logged in")
//     } else {
//       console.log("Current user is: " + currentUser.email)
//     }
// });
</script>

<template>
  <!-- <NavBar/> -->
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
