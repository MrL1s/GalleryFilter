<!-- GalleryCard -->
<template>
  <div
    class="hover:scale-102 duration-300 gap-3 mb-10 flex flex-col justify-start items-start transition"
  >
    <img
      @click="$emit('open', image)"
      :src="image.image"
      alt=""
      class="w-full cursor-pointer max-h-65 object-cover rounded-xl"
    />

    <DataCard
      :createdAt="image.createdAt"
      :timeAgo="image.timeAgo ?? ''"
      :commentsCount="image.commentsCount ?? 0"
    />

    <h2 @click="$emit('open', image)" class="font-semibold cursor-pointer text-xl line-clamp-2">
      {{ image.title }}
    </h2>

    <p class="text-black font-medium text-md line-clamp-2">
      {{ image.description }}
    </p>
    <div class="flex gap-2">
      <span
        v-for="cat in image.category"
        :key="cat"
        class="py-1 px-3 font-medium text-sm rounded-full bg-[#EEF6FF] text-[#2884EF]"
        >{{ cat }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import DataCard from './DataCard.vue'

import type { ImageWithMeta } from '@/types'

defineProps<{ image: ImageWithMeta }>()
</script>

<style scoped>
/* if not a tailwind line-clamp plugins, use fallback in css:) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
