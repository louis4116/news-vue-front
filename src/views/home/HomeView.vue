<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'
import HomeCard from '@/components/homecard/HomeCard.vue'
import { newsIntroduction } from './homeData'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const getUser = async () => {
  await authStore.getMe()
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <el-container>
    <el-header height="auto" class="p-0!">
      <NavBar />
    </el-header>
    <el-main>
      <div class="flex items-start justify-center gap-10 flex-wrap">
        <HomeCard
          v-for="item in newsIntroduction"
          :key="item.name"
          :id="item.id"
          :url="item.url"
          :name="item.name"
          :para="item.introduction"
          :img="item.img"
        />
      </div>
    </el-main>
  </el-container>
</template>
