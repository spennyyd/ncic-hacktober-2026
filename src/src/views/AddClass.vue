<script setup lang="ts">
import StudentForm from '../components/StudentForm.vue';
import { useReducer } from 'spacetimedb/vue';
import { ref } from 'vue';
import { reducers } from '../module_bindings';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

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

const className = ref('')
const semester = ref('')
const year = ref('')
const addAnother = ref(false);
</script>

<template>
  <StudentForm>
    <h1>Class</h1>
    <form @submit.prevent="createClass">
      <input type="text" class="input" placeholder="Class Name" v-model="className" />
      <input type="text" class="input" placeholder="Semester" v-model="semester" />
      <input type="text" class="input" placeholder="Year" v-model="year" />
      <label>Add another class<input type="checkbox" v-model="addAnother" /></label>
      <button type="submit">Submit</button>
    </form>
    <span> Add Class works </span>
</template>
