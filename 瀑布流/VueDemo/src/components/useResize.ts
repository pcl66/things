import { onMounted, onUnmounted, type Ref } from "vue";
import type { ICardType } from "./WaterFall.vue";
import { useDebounceFn } from "@vueuse/core";

export const useResize = (
  renderList: Ref<ICardType[]>,
  updateLayout: (data: ICardType[]) => ICardType[],
  minHeightList: Ref<number []>
) => {

  const fn = () => {
    minHeightList.value = minHeightList.value.map(() => 0)
    const processedData = updateLayout(renderList.value)
    renderList.value = [...processedData]
  }

  const fnDenounce = useDebounceFn(fn, 1000)

  onMounted(() => {
    window.addEventListener('resize', fnDenounce)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', fnDenounce)
  })
}