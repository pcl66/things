<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import type { CardType } from '../App.vue'
import { useResize } from './useResize'
import { useLoadMore } from './useLoadMore'

type P = {
  loadData: () => Promise<any>
  gap?: number
  column?: number
}

export type ICardType =
  CardType &
  { index: number,
    top: number,
    left: number,
    scaleWidth: number,
    scaleHeight: number
  }
const {
  loadData,
  column = 3,
  gap = 10
} = defineProps<P>()

const containerRef = ref<HTMLDivElement | null>(null)
const renderList = ref<ICardType[]>([])
const minHeightList = ref<number[]>(Array.from({ length: column }).map(() => 0))

const { execute, isLoading } = useAsyncState<CardType[]>(loadData, [], {
  immediate: false,
  onSuccess: (data) => {
    const processedData = updateLayout(data)
    renderList.value = [...renderList.value, ...processedData]
  }
})

const updateLayout = (data: CardType[]): ICardType[] => {
  if(!containerRef.value) return data as ICardType[]
    const { clientWidth } = containerRef.value
    const cardWidth = (clientWidth - (column - 1) * gap) / column
    const processedData = data.map((item, index) => {
      const ratio = cardWidth / item.width
      const scaleWidth = cardWidth
      const scaleHeight = item.height * ratio

      if(index < column && minHeightList.value.some(v => v === 0)) {
        // 更新最小高度的列
        minHeightList.value[index] = scaleHeight + gap
        return {
          ...item,
          index,
          top: 0,
          left: index * (cardWidth + gap),
          scaleWidth,
          scaleHeight
        }
      } else {
        // 计算最小高度的列
        let minIndex = 0
        let minHeight = Infinity
        minHeightList.value.forEach((height, i) => {
          if(height < minHeight) {
            minHeight = height
            minIndex = i
          }
        })
        // 更新最小高度的列
        minHeightList.value[minIndex] += scaleHeight + gap
        
        return {
          ...item,
          index,
          top: minHeight,
          left: minIndex * (cardWidth + gap),
          scaleWidth,
          scaleHeight
        }
      }
    })
    return processedData
}

useResize(renderList, updateLayout, minHeightList)
useLoadMore(containerRef, execute, isLoading)

const init = () => {
  execute()
}
onMounted(() => {
  init()
})

</script>

<template>
  <div class="container" ref="containerRef">
    <div class="list">
      <div
        class="item"
        v-for="item in renderList.slice(0, renderList.length)"
        :key="item.id"
        :style="{
          top: `${item.top}px`,
          left: `${item.left}px`,
          width: `${item.scaleWidth}px`,
          height: `${item.scaleHeight}px`
        }"
      >
        <img :src="item.url" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  overflow-x: hidden;
  overflow-y: scroll;
  .list {
    position: relative;
    .item {
      position: absolute;
      background-color: #f0f0f0;
      text-align: center;
      transition: all 0.3s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
  }
}
</style>
