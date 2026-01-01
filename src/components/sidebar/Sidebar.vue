<template>
  <el-scrollbar height="100vh" view-style="height:100%;">
    <el-menu
      class="h-full"
      active-text-color="white"
      background-color="#8e9295"
      :router="true"
      :default-active="activePath"
      ref="menu"
    >
      <el-menu-item index="home" :route="{ name: 'home' }" @click="handleShowClick">
        <el-icon :size="26" color="#409efc"><HomeFilled /></el-icon>首頁
      </el-menu-item>
      <el-menu-item
        index="sign"
        :route="{ name: 'sign' }"
        @click="handleShowClick"
        v-if="!authSt.signInStatus"
      >
        <el-icon :size="26" color="#409efc"><Tools /></el-icon>登入
      </el-menu-item>
      <el-menu-item index="profile" :route="{ name: 'profile' }" @click="handleShowClick" v-else>
        <el-icon :size="26" color="#409efc"><Tools /></el-icon>個人檔案
      </el-menu-item>
      <el-menu-item
        index="signout"
        :route="{ name: 'signout' }"
        @click="handleShowClick"
        v-if="authSt.signInStatus"
        ><font-awesome-icon :icon="faRightToBracket" class="text-[26px] mr-[5px]" />
        <span class="text-[14px]">登出</span></el-menu-item
      >
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/authStore'
import { useWindowWidth } from '../composable/useWindowWidth'

const pathMap: Record<string, string> = {
  news: 'home',
  home: 'home',
  sign: 'sign',
  forget: 'sign',
  profile: 'profile',
  profileNews: 'profile',
}

const emits = defineEmits(['show-click'])

const activePath = ref<string>('')

const route = useRoute()

const authSt = useAuthStore()

const { windowWidth } = useWindowWidth()

const handleShowClick = () => {
  if (windowWidth.value > 768) return
  emits('show-click', false)
}

watch(
  () => route.name,
  () => {
    if (route.name) {
      const name = route.name as string
      activePath.value = pathMap[name]
    }
  },
)
</script>

<style scoped></style>
