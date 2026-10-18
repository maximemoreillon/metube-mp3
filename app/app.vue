<template>
  <header class="flex justify-between p-2 border-b-2 items-center">
    <h1 class="text-xl">MeTube MP3</h1>
    <ModeToggle />
  </header>
  <main class="mx-auto max-w-3xl mt-8">
    <NuxtPage />
  </main>
  <Toaster />
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
</script>
