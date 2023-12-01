<template>
    <v-toolbar color="#522a80">
      <v-toolbar-side-icon>
        <v-img src="/src/assets/NongBuii.png" height="50px" width="50px" class="mx-3"></v-img>
      </v-toolbar-side-icon>
      <RouterLink to="/" style="text-decoration: none; color: inherit">
      <v-toolbar-title id="title">MUIC Tutor</v-toolbar-title>
    </RouterLink>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn id="text-button" to="/">Home</v-btn>
        <v-btn id="text-button" to="/about">About</v-btn>
        <v-btn variant="outlined rounded" prepend-icon="mdi-account-school" id="text-button" to="/login">Log In</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style>
  #title {
    font-family: "RubikBold";
    font-size: 24px;
    color: white;
  }
  #text-button {
    font-family: "Rubik";
    font-size: 14px;
    color: white;
  }
</style>