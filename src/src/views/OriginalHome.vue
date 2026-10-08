<script setup lang="ts">
import { ref } from 'vue';
import { tables, reducers } from '../module_bindings';
import { useSpacetimeDB, useTable, useReducer } from 'spacetimedb/vue';
import Button from '../components/common/Button.vue';

const props = defineProps(['id']);

const conn = useSpacetimeDB();

// Student Form
const name = ref('');
const studentClass = ref(0);

// Class Form
const className = ref('');
const classSemester = ref('');
const classYear = ref('');

// Subscribe to all people in the database
const [people] = useTable(tables.person);
const [classes] = useTable(tables.classroom);

const addReducer = useReducer(reducers.add);
const addClassReducer = useReducer(reducers.addClass);

const addPerson = () => {
  if (!name.value.trim() || !conn.isActive) return;

  // Call the add reducer
  addReducer({ name: name.value, classId: BigInt(studentClass.value) });
  name.value = '';
};

const addClass = () => {
  if (!className.value || !classSemester.value || !classYear.value) {
    return;
  }

  addClassReducer({
    name: className.value,
    semester: classSemester.value,
    year: classYear.value
  });

  className.value = '';
  classSemester.value = '';
  classYear.value = '';
}

const debug = () => {
  console.log(props.id)
}
</script>

<template>
  <h1>SpacetimeDB Vue App</h1>

  <div :style="{ marginBottom: '1rem' }">
    Status:
    <strong :style="{ color: conn.isActive ? 'green' : 'red' }">
      {{ conn.isActive ? 'Connected' : 'Disconnected' }}
    </strong>
  </div>

  <form @submit.prevent="addPerson" :style="{ marginBottom: '2rem' }">
    <input type="text" placeholder="Enter name" v-model="name" :disabled="!conn.isActive" />
    <input type="text" placeholder="Enter class" v-model="studentClass" :disabled="!conn.isActive" />
    <Button type="submit" :disabled="!conn.isActive">
      Add Person
    </Button>
  </form>

  <form @submit.prevent="addClass">
    <input type="text" placeholder="Enter class" v-model="className" />
    <input type="text" placeholder="Enter semester" v-model="classSemester" />
    <input type="text" placeholder="Enter year" v-model="classYear" />
    <Button type="submit">
      Add Class
    </Button>
  </form>

  <div class="container">
    <div>
      <h2>People ({{ people.length }})</h2>
      <p v-if="people.length === 0">No people yet. Add someone above!</p>
      <ul v-else>
        <li v-for="(person, index) in people" :key="index">
          {{ person.name }} - [{{ person.id }}]
        </li>
      </ul>
    </div>
    <div>
      <h2>Classes ({{ classes.length }})</h2>
      <p v-if="classes.length === 0">No classes yet. Add a class above!</p>
      <ul v-else>
        <li v-for="(classroom, index) in classes" :key="index">
          {{ classroom.name }} - [{{ classroom.id }}]
        </li>
      </ul>
    </div>
  </div>

  <button @click="debug">Debug</button>
</template>
