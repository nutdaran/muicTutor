<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-toolbar color="#522a80">
    <v-toolbar-side-icon>
    <v-img src="/src/assets/NongBuii.png" height="50px" width="50px"></v-img>
  </v-toolbar-side-icon>
    <v-toolbar-title  id="title">MUIC Tutor</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn id="text" text to="/">Home</v-btn>
        <v-btn id="text" text to="/about">About</v-btn>
        <v-btn id="text" text>Sign In</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <body>
    <RouterView />
  </body>
</template>

<style scoped>
header {
  padding: 1rem;
}

body {
  margin: 3rem;
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
