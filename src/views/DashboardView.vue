<template>
    <NavBar/>
    <v-alert class="alert-bar" v-if="alert" color="error" icon="$error" text="Please Log in first"></v-alert>
    <main>
        <v-btn icon @click="navigateBack">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <PieChart/>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Dashboard</h1>
                    <h2>My Courses</h2>
                    <div class="d-flex flex-wrap ga-7" id="card"> 
                        <CourseCard
                        v-for="course in userCourses" 
                        :key="course.id" 
                        :course="course" 
                        @alert-nouser="receivedAlert"
                        />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import NavBar from '../components/NavBar.vue';
    import { auth, db } from '@/firebase/firebase'; 
    import PieChart from '../components/PieChart.vue';
    import { getDoc, doc } from 'firebase/firestore'
    import { onMounted, ref } from 'vue'
    import CourseCard from '../components/CourseCard.vue'
    import { useRouter } from 'vue-router';

    let currentUser = null
    const userCoursesID = ref([])
    const userCourses = ref([])
    const router = useRouter();
    const getUserCoursesID = async () => {
        console.log(" inside getUserCoursesID")
        if(currentUser != null) {
            console.log("Current user is here inside getusercoursesid" )
            const snapshot = await getDoc(doc(db,"users",currentUser.uid))
            if (snapshot.exists()) {
                userCoursesID.value = snapshot.data().course
                console.log(userCoursesID.value)
            } else {
                console.log('Can not find this user')
            }
        }
    }

    const getUserCourses = async () => {
        console.log(" inside getUserCourses")
        for (const courseID of userCoursesID.value) {
            const snapshot = await getDoc(doc(db,"course",courseID))
            if (snapshot.exists()) {
                userCourses.value.push(snapshot.data())
                console.log(userCourses.value)
            } else {
                console.log('Can not find this course')
            }
        }
        
    }

    const navigateBack = () => {
    // Navigate to the previous page
    router.go(-1);
    };

    onMounted( async() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
        if (user) {
            currentUser = user
            console.log("Current user is here")
            await getUserCoursesID()
            await getUserCourses()
        } else {
            console.log("No user is logged in!")
        }
    })

    // Ensure to unsubscribe from the auth state listener when the component is unmounted.
    return () => unsubscribe()
})

    const alert = ref(false)
    const receivedAlert = (alert) => {
        alert.value = true
    }

</script>

<style scoped>
    #card {
            padding-top: 1rem;
            justify-content:flex-start;
            align-content: center;
        }
</style>