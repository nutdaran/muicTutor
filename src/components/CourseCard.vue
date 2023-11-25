<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { db } from '@/firebase/firebase.js'
import { doc, updateDoc, arrayUnion, increment, arrayRemove, getDoc } from 'firebase/firestore'

    const course  = defineProps({
        course: {
            type: Object,
            required: true
        }
    })

    const checkName = computed (() => {
        return course.course.studentList.includes("F");
    })

    const enrollCourse = async function (id) {
      const courseDocRef = doc(db, "course", id);
      const courseSnapshot = await getDoc(courseDocRef);

      if (courseSnapshot.exists()) {
        const studentList = courseSnapshot.data().studentList || [];
        if (!studentList.includes('F')) { //change to username
          await updateDoc(courseDocRef, {
              enrolled: increment(1),
              studentList: arrayUnion("F")
          })
          alert("Added Course");
          window.location.reload()
        }
      } else {
        console.log("No such document");
      }
    }

    const leaveCourse = async function (id) {
      const courseDocRef = doc(db, "course", id);
      const courseSnapshot = await getDoc(courseDocRef);

      if (courseSnapshot.exists()) {
        const studentList = courseSnapshot.data().studentList || [];
        if (studentList.includes('F')) {
          await updateDoc(doc(db, "course", id), {
              enrolled: increment(-1),
              studentList: arrayRemove("F")
          })
          alert("Removed Course");
          window.location.reload()
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
      <v-btn id="button-enroll" block flat prepend-icon="mdi-plus-circle-outline">
        Enroll
      </v-btn>
    </div>
    <!-- Enrolled -->
    <div class="button-container" v-show="checkName" @click="leaveCourse(course.course.id)">
      <v-btn id="button-enrolled" block flat prepend-icon="mdi-check">
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

  #button-enroll {
    background-color: #522a80;
    color: white;
    font-family: "Rubik-Regular";
    font-size: 14px;
    border-radius: 6px;
    margin-top: auto; 
  }

  #button-enrolled {
    background-color: #8c71a8;
    color: white;
    font-family: "Rubik-Regular";
    font-size: 14px;
    border-radius: 6px;
    margin-top: auto; 
  }
</style>
