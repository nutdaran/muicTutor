<script setup>
    import { ref } from 'vue'
    import { auth } from '@/firebase/firebase'
    import { useRouter } from 'vue-router'

</script>

<template>
    <div class="register-page">
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
            <div class="form">
                <label for="passwordConfirmation">Password Confirmation</label>
                <input
                id="passwordConfirmation"
                type="password"
                v-model="passwordConfirmation"
                required
                />
            </div>
            <p>Select your role:</p>
            <v-radio-group>
                <v-radio label="Student" value="False"></v-radio>
                <v-radio label="Tutor" value="True"></v-radio>
            </v-radio-group>
            <v-btn class="form" type="submit" id="main-button">Submit</v-btn>
            </form>
        </v-card>
    </div>
    </div>
</template>

<style>
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
</style>