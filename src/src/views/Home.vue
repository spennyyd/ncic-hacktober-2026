<script setup lang="ts">
import { tables } from '../module_bindings';
import { useTable } from 'spacetimedb/vue';
import { RouterLink } from 'vue-router';

// Subscribe to all people in the database
const [classes] = useTable(tables.classroom);
</script>

<template>
  <main class="container-vertical">
    <h1>Student Picker Home</h1>
    <div class="container-vertical">
      <span class="container">
        <h2>Classes </h2>
      </span>
      <p v-if="classes.length === 0">No classes yet. Add a class above!</p>
      <ul v-else>
        <li>
          <RouterLink to="/class/new">Add new class</RouterLink>
        </li>
        <li v-for="(classroom, index) in classes" :key="index">
          <RouterLink :to="`/class/${classroom.id}`">
            {{ classroom.name }} - [{{ classroom.semester }} {{ classroom.year }}]
          </RouterLink>
        </li>
      </ul>
    </div>
  </main>
</template>
