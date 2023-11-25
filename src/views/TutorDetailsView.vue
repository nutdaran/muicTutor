<script setup>
    import CourseCard  from '@/components/CourseCard.vue'
    import { computed, onMounted, ref } from 'vue';
    import { db } from '@/firebase/firebase.js'
    import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore'

    const props = defineProps({
    id: { required: true }
    })
       
    const tutor = ref({})
    const getTutor = async () => {
        const snapshot = await getDoc(doc(db,"tutor",props.id))
        if (snapshot.exists()) {
            tutor.value = snapshot.data()
        } else {
            console.log('Can not find this tutor')
        }
    }

    const courses = ref([])
    async function getCourses() {
        const q = query(collection(db, "course"), where("tutorId", "==", props.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        courses.value.push(doc.data())
        console.log(courses.value)
    });
    }

    onMounted(async () => {
            window.scrollTo(0, 0)
            console.log("Fetching database...")
            await getTutor()
            await getCourses()
            console.log("Done")
    });

    const formatBio = computed (() => {
        return tutor.value.bio.replace(/(\\r)*\\n/g, '<br>')
    })
</script>

<template>
    <main>
        <h2>Tutor Info</h2>
        <div v-if="tutor.name" class="bio"> <!--Check if the data is defined-->
            <div>
                <v-img
                :width="200"
                aspect-ratio="1/1"
                src="/src/assets/tutorProfilePictures/t1.jpg"
                ></v-img>
            </div>
            <div style="padding-left: 2rem;">
                <h1>{{ tutor.name }}</h1>
                <div id="section">
                    <p id="head"><strong>Bio</strong></p>
                    <p v-html="formatBio"></p>
                    <!-- <p>{{tutor.bio}}</p> -->
                </div>
                <p id="head"><strong>Contact</strong></p>
                <div style="display:flex">
                    <div v-show="tutor.contact[0]!=''"><a :href="tutor.contact[0]"><v-icon icon="mdi-instagram"></v-icon></a></div>
                    <div v-show="tutor.contact[1]!=''"><a :href="tutor.contact[1]"><v-icon icon="mdi-facebook"></v-icon></a></div>
                </div>
            </div>
        </div>
        <h2>List of Courses</h2> 
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
    .bio {
        display: flex;
        justify-content:flex-start;
        align-items: center;
        padding-bottom: 2rem;
        margin-top: 1rem;
    }
    #head {
        font-size: 20px;
    }
    #section{
        padding-bottom: 0.5rem;
    }
    #card {
        padding-top: 1rem;
        justify-content:flex-start;
        align-content: center;
    }
</style>
