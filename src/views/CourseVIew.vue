<script setup>
    import { auth,db } from '@/firebase/firebase.js'
    import { collection, query, where, getDocs } from 'firebase/firestore'
    import { onMounted, ref } from 'vue';
    import CourseCard  from '@/components/CourseCard.vue'
    import NavBar from '@/components/NavBar.vue'

    const props = defineProps({
    id: { required: true }
    })

    const courses = ref([])
    async function getCourses() {
        const q = query(collection(db, "course"), where("courseName", "==", props.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        courses.value.push(doc.data())
        console.log(courses.value)
    });
    }

    onMounted(async () => {
        const currentUser = auth.currentUser
        if (currentUser != null) {
            console.log("Current user is here" )
        } else {
            console.log("No user is logged in!")
        }
        window.scrollTo(0, 0)
        console.log("Fetching database...")
        await getCourses()
        console.log("Done")
    });

    const alert = ref(false)
    const receivedAlert = (alert) => {
        alert.value = true
    }
</script>

<template>
    <NavBar/>
    <v-alert class="alert-bar" v-if="alert" color="error" icon="$error" text="Please Log in first"></v-alert>
    <main>
        <div class="course">
            <h2>Course</h2>
            <h1>{{props.id}}</h1>
        </div>
        <div class="d-flex flex-wrap ga-7" id="card"> 
            <CourseCard
            v-for="course in courses" 
            :key="course.id" 
            :course="course" 
            @alert-nouser="receivedAlert"
            />
        </div>
    </main>
</template>

<style>
    #card {
            padding-top: 1rem;
            justify-content:flex-start;
            align-content: center;
        }
</style>