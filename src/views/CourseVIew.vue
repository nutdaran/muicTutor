<script setup>
    import { db } from '@/firebase/firebase.js'
    import { collection, query, where, getDocs } from 'firebase/firestore'
    import { onMounted, ref } from 'vue';
    import CourseCard  from '@/components/CourseCard.vue'

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
            window.scrollTo(0, 0)
            console.log("Fetching database...")
            await getCourses()
            console.log("Done")
    });
</script>

<template>
    <main>
        <div class="course">
            <h2>Course</h2>
            <h1>PCSA</h1>
        </div>
        <div class="d-flex flex-wrap ga-7" id="card"> 
            <CourseCard
            v-for="course in courses" 
            :key="course.id" 
            :course="course" 
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