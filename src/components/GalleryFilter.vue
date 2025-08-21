<!-- GalleryFilter -->
<template>
  <div class="flex flex-col owerflow-x-hidden">
    <!-- header -->
    <GalleryHeader />

    <!-- filter -->
    <div class="sticky top-[64px] md:top-[72px] z-40 w-full bg-white">
      <div class="container mx-auto px-4 md:px-8 flex flex-col py-4 gap-4">
        <!-- search -->
        <div class="flex flex-wrap justify-between w-full max-sm:gap-2 items-center">
          <div
            class="flex max-sm:flex-col max-sm:items-start justify-center w-full sm:w-1/2 items-center gap-4"
          >
            <h1 class="text-3xl text-black font-bold">Блог</h1>
            <GallerySearch v-model:search="search" class="w-full max-sm:w-auto" />
          </div>
          <div class="flex justify-center items-center gap-2">
            <button class="text-sm text-blue-600 cursor-pointer" @click="search = ''">
              очистить
            </button>
            <button
              class="text-sm text-gray-500 cursor-pointer flex justify-center items-center gap-2 ml-2"
              @click="hidenFilter"
            >
              <p v-if="showFilter">скрыть</p>
              фильтр
              <img v-if="showFilter" src="/svg/checkFilter.svg" alt="check" />
              <img v-else src="/svg/unCheckFilter.svg" alt="unCheck" />
            </button>
          </div>
        </div>

        <!-- filter buttons -->
        <div v-if="showFilter" class="flex flex-wrap gap-2 w-full">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="toggleCategory(cat)"
            :class="[
              'px-3 py-1 text-[#2884EF] rounded-full cursor-pointer transition flex justify-center items-center gap-2',
              category.includes(cat)
                ? 'bg-[#3E97FF] text-white'
                : 'bg-[#EEF6FF] hover:bg-gray-200/50',
            ]"
          >
            {{ cat }}
            <img v-if="category.includes(cat)" src="/svg/check.svg" alt="sheck" />
            <img v-else src="/svg/plus.svg" alt="plus" />
          </button>
        </div>
      </div>
    </div>

    <!-- gallery -->
    <div class="container mx-auto mt-20 px-4 md:px-8">
      <template v-if="filtered.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white p-7 rounded-xl">
          <GalleryCard v-for="img in filtered" :key="img.id" :image="img" @open="openModal" />
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col justify-center items-center w-full py-20 bg-white p-7 rounded-xl">
          <img src="/svg/search-list.svg" alt="" />
          <h1 class="text-gray-500">Поиск не дал результатов</h1>
          <h2 class="text-gray-400 w-1/2 text-center">
            Повторите поиск или используйте фильтр для структуризации контента
          </h2>
        </div>
      </template>
    </div>

    <!-- modal -->
    <GalleryModal v-model:visible="modalVisible" :image="selectedImage" />
  </div>
</template>

<script setup lang="ts">
import GallerySearch from './GallerySearch.vue'
import GalleryCard from './GalleryCard.vue'
import GalleryModal from './GalleryModal.vue'
import GalleryHeader from './GalleryHeader.vue'

import imagesData from '@/data/images.json'
import { useGallery } from '@/composables/useGallery'
import type { ImageItem } from '@/types'

import { ref } from 'vue'

const showFilter = ref(true)
const hidenFilter = () => {
  showFilter.value = !showFilter.value
}

// all tags from JSON
const categories = Array.from(new Set(imagesData.flatMap((i) => i.category)))

const { search, category, filtered } = useGallery(imagesData as ImageItem[])

// modal window
const modalVisible = ref(false)
const selectedImage = ref<ImageItem | null>(null)

function openModal(img: ImageItem) {
  selectedImage.value = img
  modalVisible.value = true
}

// category filter
function toggleCategory(cat: string) {
  if (category.value.includes(cat)) {
    category.value = category.value.filter((c) => c !== cat)
  } else {
    category.value.push(cat)
  }
}
</script>
