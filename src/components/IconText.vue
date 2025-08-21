<!-- IconText -->
<template>
  <span class="flex gap-2 items-center text-xs text-gray-500">
    <img src="/svg/count.svg" alt="cpunt" class="w-1 h-1">
    <img :src="icon" :alt="alt" class="w-3 h-3" />
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{ icon: string; alt: string }>()
</script>
