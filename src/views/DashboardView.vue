<template>
  <NavBar />
  <v-alert
    class="alert-bar"
    v-if="alert"
    color="error"
    icon="$error"
    text="Please Log in first"
  ></v-alert>
  <div class="main">
    <div class="heading">
      <v-btn @click="navigateBack">
        <v-icon>mdi-arrow-left</v-icon>
        prev
      </v-btn>
      <h1>Dashboard</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
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

    <div class="charts">
      <div id="pie"><PieChart :data="pieChartData" /></div>
      <div id="bar">
        <h2>My Details:</h2>
        <br />
        <!-- User email: {{ currentUser.email }} <br /> -->
        <h3>My course(s) total cost: </h3> 
        {{ totalCost }} <br /> <br />
        <h3>Time slot:</h3> 
        {{ timeSlots }} <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { auth, db } from '@/firebase/firebase'
import PieChart from '../components/PieChart.vue'
import { getDoc, doc } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import { useRouter } from 'vue-router'

const totalCost = ref(0)
const timeSlots = ref([])
let currentUser = null
const userCoursesID = ref([])
const userCourses = ref([])
const router = useRouter()
let pieDataCost = ref([])
let pieChartData = ref([
  {
    type: 'pie',
    indexLabel: '{label} (#percent%)',
    yValueFormatString: '#,##0',
    toolTipContent: "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
    dataPoints: [
      { label: 'PCSA001', y: 250 },
      { label: 'PCSA002', y: 350 },
      { label: 'Webapp003', y: 340 }
    ]
  }
])

const getUserCoursesID = async () => {
  console.log(' inside getUserCoursesID')
  if (currentUser != null) {
    console.log('Current user is here inside getusercoursesid')
    const snapshot = await getDoc(doc(db, 'users', currentUser.uid))
    if (snapshot.exists()) {
      userCoursesID.value = snapshot.data().course
      console.log(userCoursesID.value)
    } else {
      console.log('Can not find this user')
    }
  }
}

const getUserCourses = async () => {
  //   console.log('pieChartData before loop:', pieChartData.value)
  console.log(' inside getUserCourses')
  for (const courseID of userCoursesID.value) {
    const snapshot = await getDoc(doc(db, 'course', courseID))
    if (snapshot.exists()) {
      userCourses.value.push(snapshot.data())
      console.log(userCourses.value)
      totalCost.value += snapshot.data().rate
      timeSlots.value.push(snapshot.data().time)
      let pointObj = {
        label: snapshot.data().courseName,
        y: snapshot.data().rate
      }
      console.log('obj:', pointObj)
      //   pieDataCost.push(pointObj)
    } else {
      console.log('Can not find this course')
    }
  }
  pieChartData.value[0].dataPoints = pieDataCost
  console.log('pieChartData after loop:', pieChartData.value)
  pieChartData.value = [
    {
      type: 'pie',
      indexLabel: '{label} (#percent%)',
      yValueFormatString: '#,##0',
      toolTipContent: "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
      dataPoints: pieDataCost
    }
  ]
  //   console.log('pieChartData after loop:', pieChartData.value)
}

const navigateBack = () => {
  router.go(-1)
}

onMounted(async () => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user
      console.log('Current user is here')
      await getUserCoursesID()
      await getUserCourses()
      //   await getPieChartData()
    } else {
      console.log('No user is logged in!')
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
.main {
  background-color: #eaeaea;
  height: 100vh;
}

.heading {
  display: flex;
  align-items: center;
  /* padding-block: 2rem; */
  padding-top: 2rem;
  padding-inline: 2rem;
}
.heading h1 {
  font-family: 'Rubik-Regular';
  font-size: 2rem;
  font-weight: 800;
  color: #522a80;
  margin-inline: 1rem;
}

.container {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-block: 2rem;
  padding-inline: 2rem;
  /* border-bottom: 2rem; */
}

.container h2 {
  font-family: 'Rubik-Regular';
  font-size: 2rem;
  font-weight: 800;
  color: black;
  margin-inline: 1rem;
}

.charts {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-block: 2rem;
  padding-inline: 2rem;
  background-color: #522a80;
}

#pie {
  width: 35%;
  height: 50%;
  background-color: grey;
    margin-left: 5rem;
  border: 1rem solid white;
  border-radius: 1rem;
}

#bar {
  width: 35%;
  height: 24.5rem;
  background-color: white;
  margin-left: 5rem;
  border: 1rem solid white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#card {
  padding-top: 1rem;
  justify-content: flex-start;
  align-content: center;
}

.v-btn {
  font-family: 'Rubik-Regular';
  color: white;
  background-color: #522a80;
  border-radius: 2rem;
  justify-self: flex-start;
}
</style>
