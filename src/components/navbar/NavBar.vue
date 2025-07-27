<template>
  <el-header height="auto">
    <div class="nav-container flex items-center flex-col justify-center gap-5">
      <div class="flex justify-center text-4xl font-mono">即時新聞</div>
      <ul class="flex flex-wrap items-center border-b border-[#dee2e6]">
        <router-link
          v-for="nav in navData"
          :key="nav.key"
          :to="{ name: 'news', params: { id: nav.id } }"
          @click="handleClick(nav.id)"
          ><li :class="[defaultNav, nav.id === activeId ? navActive : navUnactive]" class="">
            {{ nav.name }}
          </li></router-link
        >
      </ul>
    </div></el-header
  >
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { navData } from './navData'
import { useRoute } from 'vue-router'

//nav樣式
const defaultNav =
  'text-2xl font-mono px-2 py-2 border-t-2 border-x-2 rounded-t-md hover:border-[#dee2e6] hover:bg-[#f5f5f5] transition duration-500'

const navActive = 'border-[#dee2e6] bg-[#f5f5f5]'

const navUnactive = 'border-[rgba(0,0,0,0)] bg-[rgba(0,0,0,0)] '

const route = useRoute()

const activeId = ref('')

const handleClick = (id: string) => {
  activeId.value = id
}

onMounted(() => {
  const id = route.params['id']
  if (!Array.isArray(id)) {
    activeId.value = id
  }
})
</script>

<style scoped></style>
