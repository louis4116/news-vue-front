<template>
  <li
    class="user-news-category navbar-nav nav-item mx-2 my-3 md:my-0 cursor-pointer"
    @click="handleClick"
  >
    <span class="nav-link text-3xl" :class="navActive">{{ props.name }}</span>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['cate', 'name', 'activeTag'])

const emits = defineEmits(['nav-click'])

const navActive = computed(() => {
  return props.cate === props.activeTag ? 'active' : ''
})

const handleClick = () => {
  emits('nav-click', props.cate)
}
</script>

<style scoped>
.nav-link {
  color: rgba(0, 0, 0, 0.25);
}
.user-news-category .active {
  color: rgba(0, 0, 0, 1);
}
</style>
