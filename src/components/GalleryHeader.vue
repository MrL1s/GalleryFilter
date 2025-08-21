<!-- GalleryHeader -->
<template>
  <header class="fixed top-0 left-0 w-full bg-black text-white z-50">
    <div class="container mx-auto flex items-center justify-between gap-8 py-4 px-4 md:px-8">
      <!-- logo -->
      <img src="/svg/Frame.svg" alt="logo" class="h-8 md:h-10" />

      <!-- desktop menu -->
      <nav class="hidden md:flex gap-8">
        <a href="#main" class="hover:text-gray-300 transition">Главная</a>
        <a href="#blog" class="hover:text-gray-300 transition">Блог</a>
      </nav>

      <!-- mobile burger -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden cursor-pointer focus:outline-none">
        <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </header>

  <!-- mobile menu outside of header -->
  <nav
    v-if="mobileMenuOpen"
    class="md:hidden bg-black text-white flex flex-wrap justify-around items-center text-center top-16 left-0 w-full z-100 fixed"
  >
    <a href="#main" class="py-3 hover:text-gray-300 transition" @click="!mobileMenuOpen">Главная</a>
    <a href="#blog" class="py-3 hover:text-gray-300 transition" @click="!mobileMenuOpen">Блог</a>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const mobileMenuOpen = ref(false);
</script>
