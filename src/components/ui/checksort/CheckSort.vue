<template>
  <div class="flex items-center cursor-pointer" @click="handleClick">
    時間
    <font-awesome-icon :icon="toggleArrow" class="text-[20px] ml-[10px]"></font-awesome-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { faArrowUpWideShort, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons'

const props = defineProps(['dateToggle'])

const emits = defineEmits(['date-click'])

const toggleArrow = computed(() => {
  return props.dateToggle ? faArrowUpWideShort : faArrowDownShortWide
})

const handleClick = () => {
  emits('date-click')
}
</script>

<style scoped></style>
