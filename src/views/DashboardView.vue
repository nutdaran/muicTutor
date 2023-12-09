<template>
    <NavBar/>
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

</template>

<script setup>
    import NavBar from '../components/NavBar.vue';
    import { auth, db } from '@/firebase/firebase'; 
    import PieChart from '../components/PieChart.vue';
    import { getDoc, doc } from 'firebase/firestore'
    import { onMounted, ref } from 'vue'
    import CourseCard from '../components/CourseCard.vue'

    const currentUser = auth.currentUser
    const userCourses = ref([])

    const getUserCourses = async () => {
        if(currentUser != null) {
            const snapshot = await getDoc(doc(db,"users",currentUser.uid))
            if (snapshot.exists()) {
                userCourses.value = snapshot.data().course
                console.log(userCourses.value)
            } else {
                console.log('Can not find this user')
            }
        }
    }

    onMounted(async () => {
        const currentUser = auth.currentUser
        if (currentUser != null) {
            console.log("Current user is here" )
            await getUserCourses()
        } else {
            console.log("No user is logged in!")
        }
    })

</script>

<style scoped>
    #card {
            padding-top: 1rem;
            justify-content:flex-start;
            align-content: center;
        }
</style>