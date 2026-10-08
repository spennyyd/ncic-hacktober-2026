<script setup lang="ts">

</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style>
.button {
  background-color: var(--teal);
  color: var(--ink-black);
  border: 0;
  padding: .5rem;
  margin: .5rem;
  border-radius: 4px;
}

.button:hover {
  cursor: pointer;
}
</style>
