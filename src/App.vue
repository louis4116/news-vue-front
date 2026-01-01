<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/sidebar/Sidebar.vue'
import { useAuthStore } from '@/stores/authStore'
import { useGlobalStore } from './stores/globalStore'

const authStore = useAuthStore()

const globalStore = useGlobalStore()

const is_show = ref(false)

const getUser = async () => {
  await authStore.getMe()
}

const showClick = (val?: boolean) => {
  if (val) return (is_show.value = val)
  is_show.value = !is_show.value
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <el-container>
    <el-aside
      width="128px"
      class="absolute md:left-0 z-999"
      :class="is_show ? 'left-0' : '-left-32'"
    >
      <Sidebar @show-click="showClick" />
      <div
        class="fixed top-[2.3%] none md:hidden cursor-pointer"
        :class="is_show ? 'left-34' : 'left-2'"
        @click="showClick()"
      >
        <el-icon :color="is_show ? '#ffffff' : '#409efc'" :size="32"><Menu /></el-icon>
      </div>
    </el-aside>
    <el-main class="h-[100vh] md:ml-[128px] p-0!">
      <RouterView :key="globalStore.routeKey" />
    </el-main>
    <Transition name="fade">
      <div
        class="mask fixed z-15 w-full h-full bg-[rgba(0,0,0,0.5)]"
        @click="showClick(false)"
        v-show="is_show"
      ></div
    ></Transition>
  </el-container>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
