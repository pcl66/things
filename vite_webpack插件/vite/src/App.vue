<script setup>
import { ref } from 'vue';

const showImage = ref(false);
const handleClick = () => {
  showImage.value = true;
};
</script>

<template>
  <div>
    <button @click="handleClick">显示图片</button>
    <!-- <img v-if="showImage" src="/images/vite.svg" class="logo" alt="Vite logo" /> -->
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    <img v-if="showImage" src="./assets/image2.png" width="300" alt="">
    <img v-if="showImage" src="./assets/1.jpg" width="300" alt="">
    <img v-if="showImage" src="./assets/2.jpg" width="300" alt="">
    <img v-if="showImage" src="./assets/3.jpg" width="300" alt="">
    <img v-if="showImage" src="./assets/4.jpg" width="300" alt="">
    <img v-if="showImage" src="./assets/5.jpg" width="300" alt="">
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
