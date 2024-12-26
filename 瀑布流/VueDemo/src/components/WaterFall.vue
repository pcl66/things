<script setup lang='ts'>
import { useAsyncState } from '@vueuse/core'

type P = {
  loadData: () => Promise<any>
  gap?: number
}

const {
  loadData
} = withDefaults(defineProps<P>(), {
  gap: 20
})

const { state, isLoading } = useAsyncState(loadData, {})

</script>

<template>
  <div>
    water-fall
    <div v-if="isLoading">loading</div>
    <div v-for="item in state" :key="item.id">{{ item.id }}</div>
  </div>
</template>

<style>

</style>
