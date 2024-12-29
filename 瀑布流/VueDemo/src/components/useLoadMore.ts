import { onMounted, onUnmounted, type Ref } from "vue";
import type { CardType } from "../App.vue";

export const useLoadMore = (
  containerRef: Ref<HTMLDivElement | null>,
  executor: (delay?: number) => Promise<CardType[]>,
  isLoading: Ref<boolean>
) => {
  const load = () => {
    if(isLoading.value) return
    if(!containerRef.value) return
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value
    const bottom = scrollHeight - clientHeight - scrollTop
    if(bottom < 20) {
      executor()
    }
  }
  onMounted(() => {
    containerRef.value && containerRef.value.addEventListener('scroll', load)
  })
  onUnmounted(() => {
    containerRef.value && containerRef.value.removeEventListener('scroll', load)
  })
}