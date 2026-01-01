<template>
  <div class="nav-container flex items-center flex-col justify-center gap-5 mt-3">
    <div class="flex justify-center text-4xl font-mono">即時新聞</div>
    <ul class="flex flex-wrap items-center justify-center w-full bg-[rgba(0,0,0,0.25)]">
      <router-link
        v-for="nav in navData"
        :key="nav.key"
        :to="{ name: 'news', params: { id: nav.id } }"
        @click="handleClick(nav.id)"
        ><li :class="[defaultNav, nav.id === activeId ? navActive : '']" class="">
          {{ nav.name }}
        </li></router-link
      >
      <div
        class="flex items-center p-2 cursor-pointer active:rotate-120 transition duration-200"
        @click="handleRefresh"
        v-if="is_ShowRefresh"
      >
        <el-icon :size="20"><Refresh /></el-icon>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { navData } from './navData'
import { useNewsStore } from '@/stores/newsStore'
import { useRoute } from 'vue-router'

//nav樣式
const defaultNav = 'text-xl font-mono mx-2 px-1 py-2 hover:text-[white] transition duration-500'

const navActive = 'text-[white]'

const route = useRoute()

const newStore = useNewsStore()

const activeId = ref('')

const is_ShowRefresh = computed(() => {
  return activeId.value ? true : false
})

const handleClick = (id: string) => {
  activeId.value = id
}

const handleRefresh = async () => {
  const agency = newStore.agencyRef
  const tag = newStore.tagRef
  newStore.initData()
  await newStore.getNewsData(agency, tag)
}

onMounted(() => {
  const id = route.params['id']
  if (!Array.isArray(id)) {
    activeId.value = id
  }
})
</script>

<style scoped></style>
