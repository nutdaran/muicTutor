<script setup>

import {ref} from 'vue'
// import { auth } from '@/js/firebase'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import router from '@/router/index.js'

const email = ref(null)
const password = ref(null)

// function login () {
//     console.log("Login : " + email.value + " : " + password.value);

// signInWithEmailAndPassword(auth, email.value, password.value)
// .then((userCredential) => {
//             const user = userCredential.user;
//             console.log(user)
//             console.log(userCredential)
//             router.push('/books')
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("Error Code: " + errorCode)
//             console.log("Error Message: " + errorMessage)
//         });

// }
</script>

<template>
    <div class="login-page">
        <div cladd="login">
            <v-card class="pa-5 elevation-2">
                <h2 class="pb-2">Login to Your Account</h2>
                <form>
                    <div class="form">
                        <label >Email</label>
                        <input v-model="email" id="email" type="text" />
                    </div>
                    <div class="form">
                        <label for="password">Password</label>
                        <input v-model="password" id="password" type="password" />
                    </div>
                    <div class="form pt-3">
                        <v-btn type="submit" id="main-button">Log in</v-btn>
                    </div>
                </form>
        </v-card>
        </div>
        <p class="px-3 text-white elevation-2">or</p>
        <v-card class="register">
        <h2 id="register-text">New here?</h2>
        <p id="register-text">Be our member today!</p>
        <RouterLink to="/register">
            <v-btn class="register-button" style="font-family: 'Rubik-Regular';">Register</v-btn>
        </RouterLink>
        </v-card>
    </div>
</template>

<style>
    #register-text {
        color: white;
        padding-bottom: 15px;
    }
    .register-button {
        border-radius: 20px;
        box-shadow: 2px 2px 6px 4px rgba(0, 0, 0, 0.2);
    }
    .register {
        padding: 20px;
        height:30%;
        width: 20%;
        background-color: #522a80;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .login-page {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 92vh;
        background-image: url('../assets/images/mahidol.jpg');
        background-size: cover;
        background-position: center;
    }
    .form {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }
    
    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem;
        margin-top: 0.5rem;
    }
</style>