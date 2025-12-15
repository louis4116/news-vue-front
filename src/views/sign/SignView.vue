<template>
  <div class="w-full h-full flex">
    <Transition name="right-to-left" mode="out-in">
      <el-card class="m-auto max-w-sm w-full" v-if="toggle"
        ><SignIn @handle-toggle="handleToggle"
      /></el-card>
      <el-card class="m-auto max-w-sm w-full" v-else
        ><SignUp @handle-toggle="handleToggle" /></el-card
    ></Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import SignIn from '@/components/sign/SignIn.vue'

const SignUp = defineAsyncComponent(() => import('@/components/sign/SignUp.vue'))

const toggle = ref(true)

const handleToggle = () => {
  toggle.value = !toggle.value
}
</script>

<style scoped>
.right-to-left-enter-active {
  transition: all 0.35s ease;
}
.right-to-left-leave-active {
  transition: all 0.25s ease;
}
.right-to-left-enter-from,
.right-to-left-leave-to {
  transform: translateX(5vw);
  opacity: 0;
}
</style>
