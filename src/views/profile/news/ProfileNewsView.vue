<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-center my-4">
      <div class="w-[50%]">
        <el-input
          v-model="inputModel"
          maxlength="20"
          type="text"
          placeholder="搜尋"
          @input="searchNews"
        />
      </div>
    </div>
    <div class="w-full flex items-center justify-center py-2 mb-4 flex-wrap">
      <ul class="w-full flex items-center justify-center py-2 mb-4 flex-wrap">
        <UserNewsCategory
          v-for="item in category"
          :key="item.cate"
          :cate="item.cate"
          :name="item.name"
          :activeTag="activeTag"
          @nav-click="navClick"
        />
        <CheckSort :newsItem="sliceNews" :dateToggle="dateToggle" @date-click="dateClick" />
      </ul>
      <DatePicker @date-pick="datePick" />
    </div>

    <div
      class="news-list-container items-center justify-center flex-col overflow-hidden"
      v-loading="loadingState"
    >
      <ProfileNewsList
        v-for="(item, index) in sliceNews"
        v-bind="item"
        :key="item._id"
        :data-index="index"
        @handle-loading="handleLoading"
      />
      <el-pagination
        class="justify-center mt-8"
        background
        layout="prev, pager, next"
        :page-size="10"
        :pager-count="7"
        :total="totalNumber"
        v-model:current-page="currentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import ProfileNewsList from '@/components/profile/profilenews/ProfileNewsList.vue'
import UserNewsCategory from '@/components/ui/userNewsCategory/UserNewsCategory.vue'
import CheckSort from '@/components/ui/checksort/CheckSort.vue'
import DatePicker from '@/components/date/DatePicker.vue'
import { useDebounce } from '@/components/composable/useDebounce'

type ProfileNews = {
  _id: string
  img: string
  date: string
  source: string
  storedDate: string
  title: string
  url: string
  memo: string
}

const category = [
  {
    name: '自由時報',
    cate: 'ltn',
  },
  {
    name: '自由時報-軍武',
    cate: 'military',
  },
  {
    name: '中央社',
    cate: 'cna',
  },
  {
    name: '聯合報',
    cate: 'udn',
  },
]

const props = defineProps(['profile'])

const newItems = ref<
  | {
      _id: string
      img: string
      date: string
      source: string
      storedDate: string
      title: string
      url: string
      memo: string
    }[]
  | null
>(null)

const activeTag = ref('ltn')

const inputModel = ref('')

const dateToggle = ref(false)

//當前頁面
const currentPage = ref(1)

const loadingState = ref(true)

const searchNews = useDebounce(() => {
  const nowTagNews = filterData(activeTag.value)
  const result = nowTagNews?.filter((item: ProfileNews) => item.title.includes(inputModel.value))
  if (result) {
    newItems.value = result
  }
}, 300)

const navClick = (val: string) => {
  activeTag.value = val
  const result = filterData(activeTag.value)
  if (result) {
    newItems.value = result
    dateToggle.value = false
  }
}

const filterData = (val: string) => {
  const result = props.profile?.news.filter((item: ProfileNews) => item.source === val)
  return result
}

const dateClick = () => {
  dateToggle.value = !dateToggle.value
}

const datePick = (start: string, end: string) => {
  const startParse = Date.parse(start)
  const endParse = Date.parse(end) + 86400000

  const newsData = filterData(activeTag.value)

  const result = newsData.filter((item: ProfileNews) => {
    const tempDate = Date.parse(item.storedDate)
    return startParse < tempDate && tempDate < endParse
  })
  newItems.value = result
}

const sliceNews = computed(() => {
  if (!newItems.value) return
  //每頁數量
  const pageSize = 10
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return newItems.value.slice(start, end)
})

const totalNumber = computed(() => {
  return newItems.value ? newItems.value.length : 0
})

const handleLoading = (val: boolean) => {
  loadingState.value = val
}

watch(
  () => props.profile,
  () => {
    const result = filterData(activeTag.value)
    newItems.value = result
  },
)

watch(sliceNews, (newValue) => {
  if (newValue) {
    loadingState.value = false
  }
})
</script>

<style scoped>
:deep(.el-input__wrapper) {
  padding: 0.5rem 0.75rem;
  font-size: 16px;
}
</style>
