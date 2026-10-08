<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();
const navigateHome = () => {
  router.push('/');
}
</script>

<template>
  <nav class="toolbar">
    <h3 class="toolbar-name" @click="navigateHome">Student Picker</h3>
  </nav>
</template>

<style>
.toolbar {
  width: 100%;
  height: 40px;
  display: flex;
  background-color: var(--teal);
  margin-bottom: 8px;
  align-items: center;
}

.toolbar-name {
  align-self: center;
  padding: 4px;
}

.toolbar-name:hover {
  cursor: pointer;
}
</style>
