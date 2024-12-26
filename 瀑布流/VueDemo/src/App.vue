<script setup lang="ts">
import WaterFall from './components/WaterFall.vue';
import data1 from './data/data1.json'
import data2 from './data/data2.json'

type RawData = typeof data1

const data = [...data1.data.items, ...data2.data.items] as RawData['data']['items']

const loadData = async () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(data)
  }, 1000)
})

</script>

<template>
  <div>
    <WaterFall :load-data="loadData"/>
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
