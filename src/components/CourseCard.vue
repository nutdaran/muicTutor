<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { db,auth } from '@/firebase/firebase.js'
import { doc, updateDoc, arrayUnion, increment, arrayRemove, getDoc } from 'firebase/firestore'

  const currentUser = auth.currentUser
  const username = ref(null)
  const course  = defineProps({
      course: {
          type: Object,
          required: true
      }
  })

  onMounted(async () => {
      console.log("Fetching database...")
      await getUsername()
      console.log("Done")
  })

  const getUsername = async () => {
    if (currentUser!=null) {
      const snapshot = await getDoc(doc(db,"users",currentUser.uid))
      if (snapshot.exists()) {
          username.value = snapshot.data().username
          console.log("username:"+username.value)
      }
    } else {
        console.log('no user log in')
    }
}

  const checkName = computed (() => {
      return course.course.studentList.includes(username.value);
  })

  // add student into the course + add course into student
  const enrollCourse = async function (id) {

    if (currentUser!=null) {
      const courseDocRef = doc(db, "course", id);
      const courseSnapshot = await getDoc(courseDocRef);
      const userDocRef = doc(db,"users", currentUser.uid);
      const studentList = courseSnapshot.data().studentList || [];

      if (courseSnapshot.exists()) {
        if (!studentList.includes(username.value)) { //change to username
          await updateDoc(courseDocRef, {
              enrolled: increment(1),
              studentList: arrayUnion(username.value)
          })
          await updateDoc(userDocRef, {
              course: arrayUnion(courseSnapshot.data().id)
          })
          alert("Added Course");
          window.location.reload()
        }
      }
    } else {
      // const emit = defineEmits('alert-nouser')
      // emit('alert-nouser')
      // this.$emit('alert-nouser')
      console.log("No such document");
    }
  }

  const leaveCourse = async function (id) {
    const courseDocRef = doc(db, "course", id);
    const courseSnapshot = await getDoc(courseDocRef);
    const userDocRef = doc(db,"users", currentUser.uid);

    if (courseSnapshot.exists()) {
      const studentList = courseSnapshot.data().studentList || [];
      if (studentList.includes(username.value)) {
        await updateDoc(doc(db, "course", id), {
            enrolled: increment(-1),
            studentList: arrayRemove(username.value)
        })
        await updateDoc(userDocRef, {
            course: arrayRemove(courseSnapshot.data().id)
        })
        alert("Removed Course");
        // window.location.reload()
      }
    } else {
      console.log("No such document");
    }
  }

</script>

<template>
  <v-card class="card">
    <div class="card-content">
      <h3>
        <RouterLink style="text-decoration: none; color: inherit" :to="{ name: 'course', params: { id: course.course.courseName} }">
        <span class="link">{{ course.course.courseName }}</span>
        </RouterLink>
      </h3>
      <p><strong>Tutor: </strong>
        <RouterLink style="text-decoration: none; color: inherit" :to="{ name: 'tutor', params: { id: course.course.tutorId } }">
          <span class="link">{{ course.course.tutor }}</span>
          </RouterLink></p>
      <p><strong>Time:</strong> {{ course.course.time }}</p>
      <p><strong>Cost:</strong> {{ course.course.rate }}</p>
      <p><strong>Seat Available:</strong> {{ course.course.enrolled }}/{{ course.course.capacity }} </p>
    </div>
    <!-- Enroll Button type -->
    <!-- Normal  -->
    <div class="button-container" v-show="!checkName && course.course.enrolled!=course.course.capacity" @click="enrollCourse(course.course.id)">
      <v-btn id="main-button" block flat prepend-icon="mdi-plus-circle-outline">
        Enroll
      </v-btn>
    </div>
    <!-- Enrolled -->
    <div class="button-container" v-show="checkName" @click="leaveCourse(course.course.id)">
      <v-btn id="clicked-button" block flat prepend-icon="mdi-check">
        Enrolled
      </v-btn>
    </div>
    <!-- Full -->
    <div class="button-container" v-show="course.course.enrolled==course.course.capacity && !checkName">
      <v-btn id="button-full" block :disabled="course.course.enrolled==course.course.capacity">
        Full
      </v-btn>
    </div>
  </v-card>
</template>

<style>
  .link:hover {
    color:#522a80;
  }
  .card {
    border-radius: 12px;
    background-color: #f6f6f6;
    box-shadow: 0px 6px 8px 1px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
  }

  .card-content {
    flex-grow: 1; 
  }

  .button-container {
    margin-top: auto; 
  }

</style>
