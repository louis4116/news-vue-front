<template>
  <div class="flex items-center cursor-pointer" @click="handleClick">
    時間
    <font-awesome-icon :icon="toggleArrow" class="text-[20px] ml-[10px]"></font-awesome-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { faArrowUpWideShort, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons'

type ProfileNews = {
  _id: string
  img: string
  date: string
  source: string
  storedDate: string
  title: string
  url: string
}

const props = defineProps(['newsItem', 'dateToggle'])

const emits = defineEmits(['date-click'])

const toggle = ref(false)

const toggleArrow = computed(() => {
  return props.dateToggle ? faArrowUpWideShort : faArrowDownShortWide
})

const handleClick = () => {
  const result = props.newsItem.sort((a: ProfileNews, b: ProfileNews) => {
    let tempA = Date.parse(a.storedDate)
    let tempB = Date.parse(b.storedDate)
    if (props.dateToggle) {
      return tempA - tempB //升序
    } else {
      return tempB - tempA //降序
    }
  })
  toggle.value = !toggle.value
  console.log(result)
  emits('date-click')
}
</script>

<style scoped></style>
