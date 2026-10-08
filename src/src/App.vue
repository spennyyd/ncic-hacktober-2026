<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toolbar from './layout/Toolbar.vue';
</script>

<template>
  <Toolbar />
  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  padding: 8px;
}
</style>
