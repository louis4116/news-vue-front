<template>
  <el-card style="max-width: 320px; min-width: 200px; min-height: 360px">
    <template #header>
      <h2 class="home-card-header line-base-set">{{ props.name }}</h2>
    </template>
    <el-image
      :src="props.img"
      fit="contain"
      class="min-h-[10rem]"
      style="display: flex; align-items: center; justify-content: center"
    />
    <div class="home-card-intro line-base-set">
      {{ props.para }}
    </div>
    <router-link :to="{ name: 'news', params: { id: props.id } }">
      <el-button type="primary" class="mt-4"> 前往{{ props.name }} </el-button>
    </router-link>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps(['para', 'img', 'name', 'id', 'url'])
</script>

<style scoped></style>
