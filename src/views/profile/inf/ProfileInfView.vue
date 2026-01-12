<template>
  <div class="profile-summary flex flex-col items-center justify-center" v-loading="loadingState">
    <ul class="w-full md:w-[75%] flex flex-col items-center justify-start mb-2 mt-10">
      <li class="w-full flex items-center justify-start text-xl mb-4 gap-2">
        <div>暱稱:</div>
        <div class="w-[75%]">{{ props.profile?.name }}</div>
      </li>
      <li class="w-full flex items-center justify-start text-xl mb-4 gap-2">
        <div>信箱:</div>
        <div class="w-[75%]">{{ props.profile?.email }}</div>
      </li>
    </ul>
    <ProfileInfForm @handle-loading="handleLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ProfileInfForm from '@/components/profile/profileinf/ProfileInfForm.vue'

const props = defineProps(['profile'])

const loadingState = ref(true)

const handleLoading = (val: boolean) => {
  loadingState.value = val
}

watch(
  () => props.profile,
  (newValue) => {
    if (newValue) {
      loadingState.value = false
    }
  },
)
</script>

<style scoped></style>
