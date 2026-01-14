<template>
  <el-container class="h-full overflow-hidden">
    <el-header class="flex items-center text-3xl border-b md:pl-12">個人檔案</el-header>
    <el-container :direction="directionMain" class="h-full">
      <el-aside :width="asideWidth" class="h-auto">
        <el-menu class="h-full" :router="true" :default-active="defaultActive">
          <el-menu-item index="profile" :route="{ name: 'profile' }">
            <FontAwesomeIcon :icon="faPen" class="mr-2" />
            個人資料
          </el-menu-item>
          <el-menu-item index="profileNews" :route="{ name: 'profileNews' }">
            <FontAwesomeIcon :icon="faPen" class="mr-2" />已儲存新聞</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView :profile="profile" @refresh-data="getUser" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/authStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useWindowWidth } from '@/components/composable/useWindowWidth'

type Profile = {
  avatar: string
  email: string
  name: string
  news: {
    _id: string
    img: string
    date: string
    source: string
    storedDate: string
    title: string
    url: string
  }[]
  _id: string
}

const { windowWidth } = useWindowWidth()

const authStore = useAuthStore()

const route = useRoute()

const profile = ref<Profile | null>(null)

const defaultActive = computed(() => {
  const activeName = route.name as string
  return activeName
})

const getUser = async () => {
  try {
    await authStore.getMe()
    profile.value = authStore.userData
  } catch (error) {
    console.error(error)
  }
}

const directionMain = computed(() => {
  return windowWidth.value >= 990 ? 'horizontal' : 'vertical'
})

const asideWidth = computed(() => {
  return windowWidth.value >= 990 ? '210px' : 'auto'
})

watch(
  () => route.name,
  () => {
    getUser()
  },
)

watch(
  () => authStore.userData,
  (newValue) => {
    profile.value = newValue
  },
)

onMounted(() => {
  getUser()
})
</script>

<style scoped>
.el-menu {
  @media screen and (max-width: 990px) {
    border: none;
  }
}
.el-header {
  @media screen and (max-width: 768px) {
    padding-left: 2.5rem;
  }
}
</style>
