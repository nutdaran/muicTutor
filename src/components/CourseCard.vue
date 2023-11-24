<script setup>
import { computed } from 'vue';

// import { defineEmits } from 'vue'
    const course  = defineProps({
        course: {
            type: Object,
            required: true
        }
    })

    const checkName = computed (() => {
        return course.course.studentList.includes("F");
    })

</script>

<template>
  <v-card class="card">
    <div class="card-content">
      <h3>{{ course.course.courseName }}</h3>
      <p><strong>Tutor:</strong> {{ course.course.tutor }}</p>
      <p><strong>Time:</strong> {{ course.course.time }}</p>
      <p><strong>Cost:</strong> {{ course.course.rate }}</p>
      <p><strong>Seat Available:</strong> {{ course.course.enrolled }}/{{ course.course.capacity }} </p>
    </div>
    <!-- Enroll Button type -->
    <!-- Normal  -->
    <div class="button-container" v-show="!checkName && course.course.enrolled!=course.course.capacity" @click="$emit('addStudent',course.course.courseID)">
      <v-btn id="button-enroll" block flat prepend-icon="mdi-plus-circle-outline">
        Enroll
      </v-btn>
    </div>
    <!-- Enrolled -->
    <div class="button-container" v-show="checkName" @click="$emit('removeStudent',course.course.courseID)">
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
