<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-gray-800">
    <div class="flex flex-col items-center text-center">
      <h1 class="text-9xl font-bold text-gray-900 tracking-tighter">404</h1>
      <h2 class="mt-4 text-3xl font-light tracking-tight text-gray-400 md:text-4xl">Not Found</h2>
      <p class="mt-4 text-base leading-7 text-gray-400">
        抱歉，我們找不到您要找的頁面。<br />或許您可以回到首頁試試看。
      </p>
      <div class="mt-8 flex items-center justify-center gap-x-6">
        <router-link to="/">
          <el-button type="info">返回首頁</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
