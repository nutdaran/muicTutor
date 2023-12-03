<script setup>

import {ref} from 'vue'
import { auth } from '@/firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'

const email = ref(null)
const password = ref(null)
const alert = ref(false)

function login () {
    console.log("Login : " + email.value + " : " + password.value);

signInWithEmailAndPassword(auth, email.value, password.value)
.then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            console.log(userCredential)
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Code: " + errorCode)
            console.log("Error Message: " + errorMessage)
            alert.value = true
        });

}
</script>

<template>
    <!-- <v-alert class="alert" v-if="alert" color="error" icon="$error" title="Invalid email/password"></v-alert> -->
    <div class="login-page">
        <v-alert class="alert-bar" v-if="alert" color="error" icon="$error" title="Invalid email/password"></v-alert>
        <div cladd="login">
            <v-card class="pa-5 elevation-2">
                <h2 class="pb-2">Login to Your Account</h2>
                <form @submit.prevent="login">
                    <div class="form">
                        <label >Email</label>
                        <input v-model="email" id="email" type="text" required/>
                    </div>
                    <div class="form">
                        <label for="password">Password</label>
                        <input v-model="password" id="password" type="password" required/>
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
            <v-btn class="register-button">Register</v-btn>
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
        font-family: 'Rubik-Regular';
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
    .alert-bar {
        z-index: 1;
        position: absolute;
        top: 10%;
    }
    
    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem;
        margin-top: 0.5rem;
    }
</style>