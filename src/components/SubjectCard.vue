<template>
    <RouterLink :to="{ name: 'course', params: { id: props.subject } }" >
    <div class="subject-card">
      <h2>{{ props.subject }}</h2>
      <img :src="`/src/assets/images/${props.subject.toLowerCase()}.jpg`" alt="">
    </div>
    </RouterLink>
</template>

<script setup>
const props = defineProps(['subject']);
console.log(props.subject);


</script>

<style scoped>
.subject-card {
  width: 25vw;
  height: 25vh;
  cursor: pointer;
  border: 1px solid #39495c;
  border-radius: 2rem;
  margin-bottom: 18px;
  text-align: center;
  color: white;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #522a80;
}
.subject-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.subject-card img {
  width: 100%;
  height: 88%;
  object-fit: cover;
  border-radius: 2rem;
  /* position: absolute; */
}

</style>
