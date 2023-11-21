<script setup>
import { ref, onMounted } from 'vue'

import satPoster from '../assets/images/satPoster.png'
import VolunteerPoster from '../assets/images/VolunteerPoster.jpg'
import NongBuii from '../assets/NongBuii.png'

const images = [satPoster, VolunteerPoster, NongBuii]

const currentIndex = ref(0);
const showLeftButton = ref(false);
const showRightButton = ref(false);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

const showButtons = () => {
  showLeftButton.value = true;
  showRightButton.value = true;
};

const hideButtons = () => {
  showLeftButton.value = false;
  showRightButton.value = false;
};

onMounted(() => {
  // Auto slide every 3 seconds (adjust the interval as needed)
  setInterval(() => {
    nextSlide();
  }, 3000);
});

</script>

<template>
    <div class="image-slider-container" @mouseover="showButtons" @mouseout="hideButtons">
        <div class="slider-container" :style="{ transform: `translateX(${currentIndex * -100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="slide">
            <img :src="image" alt="Slide" />
        </div>
        </div>
    <v-icon v-show="showLeftButton" class="nav-icon left" @click="prevSlide">mdi-chevron-left</v-icon>
    <v-icon v-show="showRightButton" class="nav-icon right" @click="nextSlide">mdi-chevron-right</v-icon>
  </div>
  <div class="radio-buttons">
      <label v-for="(image, index) in images" :key="index" :class="{ 'selected': currentIndex === index }">
        <input type="radio" v-model="currentIndex" :value="index" />
        <span class="indicator"></span>
      </label>
    </div>
</template>

<style scoped>

.slider-container {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  flex: 0 0 100%;
}

img {
  width: 100%;
  height: 700px;
}


.nav-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  color: white;
  transition: opacity 0.3s ease; /* Add a fade effect to the buttons */
}

.left {
  left: 20px;
  color: black;
}

.right {
  right: 20px;
  color: black;
}

/* Hide buttons by default */
.nav-icon {
  opacity: 0;
}

/* Show buttons on hover */
.image-slider-container:hover .nav-icon {
  opacity: 1;
}

.radio-buttons {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  background-color: black;
  border-radius: 20px;
  opacity: 0.4;
  z-index: 1; /* Ensure the radio buttons appear above the image */

}

.radio-buttons label {
  position: relative;
  cursor: pointer;
  margin: 0 5px;
  overflow: hidden; /* Hide overflow */
}

.radio-buttons input {
  display: none; /* Hide the default radio button */
}

.radio-buttons .indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5); /* Adjust transparency */
  display: inline-block;
  margin-top: 3px;
  transition: background-color 0.3s ease;
}

.radio-buttons label:hover .indicator {
  background-color: rgba(255, 255, 255, 0.8); /* Adjust hover transparency */
}

.radio-buttons input:checked + .indicator {
  background-color: rgba(255, 255, 255, 1); /* Adjust selected transparency */
}

.selected .indicator {
  background-color: rgba(255, 255, 255, 1); /* Adjust selected transparency */
}
</style>
