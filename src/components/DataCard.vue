<!-- DataCard -->
<template>
  <div class="flex justify-start items-center gap-2 text-sm font-medium text-gray-500">
    <!-- data -->
    <GalleryDate :createdAt="createdAt" />

    <!-- time -->
    <IconText icon="/svg/time.svg" alt="time">
      {{ timeAgo }}
    </IconText>

    <!-- comments -->
    <IconText icon="/svg/messages.svg" alt="messages">
      {{ commentsCount }}
      <span v-if="commentsCount === 1">комментарий</span>
      <span v-else-if="commentsCount > 1 && commentsCount < 5">комментария</span>
      <span v-else>комментариев</span>
    </IconText>
  </div>
</template>

<script setup lang="ts">
import GalleryDate from './GalleryDate.vue'
import IconText from './IconText.vue'

defineProps<{
  createdAt: string
  timeAgo: string
  commentsCount: number
}>()
</script>
