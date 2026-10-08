<script setup lang="ts">
import { useReducer } from 'spacetimedb/vue';
import { ref } from 'vue';
import { reducers } from '../module_bindings';
import { useRouter } from 'vue-router';

const props = defineProps<{
  className: string,
  semester: string,
  year: string,
  mode: 'add' | 'edit'
}>();

const createClass = () => {
  addClassReducer({
    name: className.value,
    semester: semester.value,
    year: year.value
  })

  if (addAnother.value) {
    className.value = '';
    semester.value = '';
    year.value = '';
  } else {
    router.push("/");
  }
}

const router = useRouter()
const addClassReducer = useReducer(reducers.addClass)

const className = ref(props.className ?? '')
const semester = ref(props.semester ?? '')
const year = ref(props.year ?? '')
const addAnother = ref(false);
</script>

<template>
  <h1>{{ props.mode }} class</h1>
  <form @submit.prevent="createClass">
    <input type="text" class="input" placeholder="Class Name" v-model="className" />
    <input type="text" class="input" placeholder="Semester" v-model="semester" />
    <input type="text" class="input" placeholder="Year" v-model="year" />
    <label>Add another class<input type="checkbox" v-model="addAnother" /></label>
    <button type="submit">Submit</button>
  </form>
  <span> Add Class works </span>
</template>
