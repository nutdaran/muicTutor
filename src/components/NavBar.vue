<script setup>
  import { auth, db } from '@/firebase/firebase'
  import { onMounted, ref } from 'vue'
  import { getDoc, doc } from 'firebase/firestore'

  const currentUser = auth.currentUser
  const userDetail = ref({})

  const getUserDetail = async () => {
      if(currentUser != null) {
        const snapshot = await getDoc(doc(db,"users",currentUser.uid))
        if (snapshot.exists()) {
            userDetail.value = snapshot.data()
            // console.log(userDetail.value.username)
        } else {
            console.log('Can not find this user')
        }
    }
  }

  onMounted(async () => {
    // currentUser.value = auth.currentUser
    if (currentUser != null) {
      console.log("Current user is here" )
      await getUserDetail()
      // console.log(currentUser)
    } else {
      console.log("No user is logged in!")
    }
  })

  const logout = () => {
    auth.signOut()
    console.log("User has logged out")
    window.location.reload()
  }

</script>

<template>
    <v-toolbar color="#522a80">
      <div class="home-icon">
        <v-img src="/src/assets/NongBuii.png" height="50px" width="50px" class="mx-3"></v-img>
      <RouterLink to="/" style="text-decoration: none; color: inherit">
      <v-toolbar-title id="title">MUIC Tutor</v-toolbar-title>
    </RouterLink>
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn id="text-button" to="/">Home</v-btn>
        <v-btn id="text-button" to="/about">About</v-btn>
        <v-btn id="text-button" to="/login" v-show="currentUser==null" variant="outlined" prepend-icon="mdi-account-school">Log In</v-btn>
        <v-btn id="text-buttn" v-show="currentUser!=null">Hi, {{ userDetail.username }}
          <v-menu activator="parent">
            <v-list>
              <v-list-item to="/dashboard">Dashboard</v-list-item>
              <v-list-item id="logout-btn" @click="logout">Log out</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
</template>

<style>
  #title {
    font-family: "Rubik-Bold";
    font-size: 24px;
    color: white;
  }
  #text-button {
    font-family: "Rubik-Regular";
    font-size: 14px;
    color: white;
    border-radius: 12px;
  }
  #logout-btn {
    font-family: "Rubik-Regular";
    font-size: 16px;
    color: red;
    border-radius: 12px;
  }
  .home-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>