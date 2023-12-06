<script setup>
    import { ref } from 'vue'
    import { auth, db } from '@/firebase/firebase'
    import { createUserWithEmailAndPassword } from 'firebase/auth'
    import { doc, setDoc } from 'firebase/firestore';

    const name = ref(null)
    const email = ref(null)
    const password = ref(null)
    const role = ref(null)
    const alert = ref(false)

    function onSubmit() {
        // Create new user
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            // Add new user in collection
            await setDoc(doc(db,"users",user.uid), 
            {
                username: name.value,
                email: email.value,
                tutor: role.value,
                course: {}
            });
            console.log(user)
            console.log(userCredential)
            alert.value = true
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Code: " + errorCode)
            console.log("Error Message: " + errorMessage)
        });
    }
</script>

<template>
    <div class="register-page">
        <v-alert class="alert-bar" v-if="alert" color="success" icon="$success" text="Successfully registered"></v-alert>
        <div class="register-box">
        <v-card class="pa-5 elevation-2">
            <h2>Register</h2>
            <form @submit.prevent="onSubmit">
            <div class="form">
                <label for="name">Name</label>
                <input
                id="name"
                type="text"
                v-model="name"
                required
                />
            </div>
            <div class="form">
                <label for="email">Email</label>
                <input
                id="email"
                type="email"
                v-model="email"
                required
                />
            </div>
            <div class="form">
                <label for="password">Password</label>
                <input
                id="password"
                type="password"
                v-model="password"
                required
                />
            </div>
            <div>
                <p>Select your role:</p>
                <v-radio-group color="purple-darken-3" v-model="role" required>
                    <v-radio label="Student" value="False"></v-radio>
                    <v-radio label="Tutor" value="True"></v-radio>
                </v-radio-group>
            </div>
            <v-btn type="submit" id="main-button">Submit</v-btn>
            </form>
        </v-card>
        </div>
    </div>
</template>

<style>
    .alert-bar {
        z-index: 1;
        position: absolute;
        top: 15%;
    }
    .register-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 92vh;
        background-image: url('../assets/images/mahidol.jpg');
        background-size: cover;
        background-position: center;
    }
    .register-box {
        width: 25%;
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