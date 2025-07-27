<template>
  <div class="date-picker">
    <el-date-picker
      v-model="dateModel"
      type="daterange"
      range-separator="To"
      start-placeholder="開始"
      end-placeholder="結束"
      size="default"
      :editable="false"
      :disabled-date="disabledDate"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['date-pick'])

const dateModel = ref('')

const handleChange = () => {
  const [startDate, endDate] = dateModel.value
  emits('date-pick', startDate, endDate)
}

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>

<style scoped></style>
