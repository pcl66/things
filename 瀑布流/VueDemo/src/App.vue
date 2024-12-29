<script setup lang="ts">
import WaterFall from './components/WaterFall.vue';
import data1 from './data/data1.json'
import data2 from './data/data2.json'

type RawData = typeof data1

const data = [...data2] as RawData

export type CardType = {
  id: string
  width: number
  height: number
  url: string
}
const loadData = async () => new Promise<CardType[]>((resolve) => {
  setTimeout(() => {
    resolve(data.map(item => ({id: item.picture_id, width: item.width, height: item.height, url: item.original_url})))
  }, 1000)
})

</script>

<template>
  <div style="width: 50vw; height: 700px; margin: 0 auto;">
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
