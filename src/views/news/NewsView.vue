<template>
  <el-container class="h-full">
    <el-header height="auto" class="border-[rgba(0,0,0,0.15)] p-0!">
      <NavBar />
    </el-header>
    <el-main class="h-[85%]">
      <div class="flex flex-col justify-center items-center gap-6 mb-5">
        <NewsCategory :routeId="routeId" @init-page="initPage" />
        <div
          class="flex-center flex-col w-full"
          v-loading="loadingState"
          element-loading-text="資料讀取中。。。"
        >
          <div class="flex-center">
            <el-row :gutter="40" justify="center">
              <NewsCard
                v-for="item in sliceNews"
                :key="item.url"
                :date="item.date"
                :url="item.url"
                :img="item.img"
                :title="item.title"
                :source="item.source"
              />
            </el-row>
          </div>
          <el-pagination
            layout="prev, pager, next"
            v-model:currentPage="currentPage"
            :total="totalPage"
            v-if="sliceNews"
            background
          />
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/navbar/NavBar.vue'
import NewsCard from '@/components/ui/newscard/NewsCard.vue'
import NewsCategory from '@/components/ui/newscategory/NewsCategory.vue'
import { useNewsStore } from '@/stores/newsStore'

const newsStore = useNewsStore()

const route = useRoute()

const routeId = ref<string | null>(null)

const currentPage = ref(1)

const sliceNews = computed(() => {
  if (!newsStore.newsData || newsStore.newsData.length <= 0) return

  const pageSize = 10
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return newsStore.newsData.slice(start, end)
})

const totalPage = computed(() => {
  return newsStore.newsData ? newsStore.newsData.length : 0
})

const loadingState = computed(() => {
  if (!sliceNews.value) return true
  return sliceNews.value.length >= 1 ? false : true
})

const initPage = () => {
  currentPage.value = 1
}

watch(
  () => route.params,
  () => {
    const { id } = route.params
    routeId.value = id as string
    initPage()
  },
)

onMounted(() => {
  const { id } = route.params
  routeId.value = id as string
})
</script>

<style scoped>
.el-loading-spinner {
  margin-top: 5%;
}
</style>
