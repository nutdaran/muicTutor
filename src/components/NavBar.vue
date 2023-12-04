<script>
  import { auth } from '@/firebase/firebase'
  import { ref,onMounted } from 'vue'
  // import { getDoc, doc } from 'firebase/firestore'

  const currentUser = ref(null)
  // const userDetail = ref({})

  // const getUserDetail = async () => {
  //     const snapshot = await getDoc(doc(db,"users",auth.currentUser))
  //     if (snapshot.exists()) {
  //         userDetail.value = snapshot.data()
  //     } else {
  //         console.log('Can not find this user')
  //     }
  // }

  onMounted(() => {
    currentUser.value = auth.currentUser
    if (currentUser.value != null) {
      console.log("Current user is: " + currentUser.value.uid)
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     currentUser.value = user
    //   } else {
    //     currentUser.value = null
    //   }
    // })
  })
</script>

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
        <v-btn variant="outlined" prepend-icon="mdi-account-school" id="text-button" to="/login">Log In</v-btn>
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
    border-radius: 12px;
  }
</style>