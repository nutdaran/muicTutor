<template>
  <NavBar/>
  <ImageSlider />
  <div>
      <div class = "factbox">
        
        <div class = "infono">
          <VueNumberAnimation
            id = "num1"
            ref="number1"
          :from="0"
          :to="numOfStudent"
          :format="theFormat"
          :duration="1.5"
          autoplay
            easing="linear"
          /> <br/>
          Students enrolled 
        </div>

        <div class = "infono">
          <VueNumberAnimation
            id = "num1"
            ref="number1"
          :from="0"
          :to="numOfTutors"
          :format="theFormat"
          :duration="1.5"
          autoplay
            easing="linear"
          /> <br/>
          Active tutors
        </div>

        <div class = "infono">
          <VueNumberAnimation
            id = "num1"
            ref="number1"
          :from="0"
          :to="numOfCourses"
          :format="theFormat"
          :duration="1.5"
          autoplay
            easing="linear"
          /> <br/>
          Courses available
        </div>
        
      </div>
      <!-- <v-icon>mdi-home</v-icon>  -->
      <main>
      <div class = "foo">
        <h2>Subject Offerings</h2> 
        <p>Hello there! Welcome to MUIC Tutor. We are here to help you with your studies.<br/>
        Here are the subjects that our tutors can help you with:</p>
      </div>

      <div class="subjects">
        <SubjectCard v-for="subject in subjects" :key="subject" :subject="subject" />
      </div>
    </main>
    <PieChart :subjects="subjects" />
      <div class="welcomebox">
        <div class="img1"><img :src="t4" alt=""></div>
        <div class = "hellotxt">
          Enroll Now !<br> All right reserved by MUIC Tutor 2024 CC
        </div>
      </div>
      
  </div>
</template>

<script setup>
import ImageSlider from '../components/ImageSlider.vue';
import t4 from '../assets/tutorProfilePictures/t4.jpg';
import VueNumberAnimation from "vue-number-animation";
import { ref, onMounted } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase.js'
import SubjectCard from '../components/SubjectCard.vue';
import NavBar from '@/components/NavBar.vue'
import PieChart from '../components/PieChart.vue';

const numOfStudent = ref(42);
const numOfCourses = ref(12);
const numOfTutors = ref(44);
const theFormat = ref((value) => {
  return value.toFixed(0);
});

const courses = ref([])
const subjects = ref([])

async function getCourses() {
  onSnapshot(collection(db, "course"), (querySnapshot) => {
    let coursesSnapshot = []
    let totalStudent = 0
    // let totalTutor = 0
    let courseName = new Set()
    querySnapshot.forEach((doc) => {
      let course = {
        "id": doc.id,
        "capacity": doc.data().capacity,
        "courseName": doc.data().courseName,
        "enrolled": doc.data().enrolled,
        "rate"  : doc.data().rate,
        "time"  : doc.data().time,
        "tutorId": doc.data().tutorId,
        "tutor": doc.data().tutor,
      }
      totalStudent += doc.data().enrolled
      // totalTutor += doc.data().tutor
      courseName.add(doc.data().courseName)
      coursesSnapshot.push(course)
    })
    courses.value = coursesSnapshot
    console.log("course name =", ...courseName)
    for (const name of courseName) {
      console.log("Course name:", name);
    }
    numOfStudent.value = totalStudent
    // numOfTutors.value = totalTutor
    numOfCourses.value = courses.value.length
    subjects.value = [...courseName]

  })
}

onMounted(async () => {
    const currentUser = auth.currentUser
    if (currentUser != null) {
        console.log("Current user is here" )
    } else {
        console.log("No user is logged in!")
    }
    console.log("Connecting to Firebase")
    await getCourses()
    console.log("Done")
})

</script>

<style>
  main {
      margin-top: 3rem;
      margin-left: 8rem;
      margin-right: 8rem;
      margin-bottom: 3rem;
      /* border: 10px solid red; */
    }
    
  .factbox {
    position: relative;
    height: 45vh;
    /* width: ; */
    background-color: #eaeaea;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }  

  .infono {
    border-radius: 2rem;
    box-shadow: 0px 6px 6px 4px rgba(0, 0, 0, 0.1);
    margin: 2rem;
    height:60%;
    width: 15%;
    background-color: white;
    font-size: 20px;
    font-family: 'Rubik-Regular';
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: grey;

  }

  #num1 {
    font-size: 64px;
    font-weight: bold;
    text-align: center;
    color: #522a80;
  }

  .welcomebox {
    position: relative;
    height: 40vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: #522a80;
  }
  .img1 {
    height: 80%;
    width: 30%;
    margin-left: 3rem;
    /* border: 5px solid; */
    /* display: flex; */
  }
 .img1 img {
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container*/
    border-radius: 50%;
  }
   
  .hellotxt {
    margin-right: 3rem;
    font-size: 30px;
    color: white;
    text-align: right;
    /* border: 5px solid; */
  }

  .foo {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .subjects {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>
