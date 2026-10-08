<script setup lang="ts">
import _ from 'lodash';
import { ref } from 'vue';
import { Student } from '../types/student';
import { useTable } from 'spacetimedb/vue';
import { tables } from '../module_bindings';

const props = defineProps(['id'])

let students = ref<Student[]>([]);
let selectedStudents = ref<Student[]>([]);
let activeStudent = ref<Student | undefined>(undefined);

const [people] = useTable(tables.person.where(x => x.classroomId.eq(BigInt(props.id))));
const [classroom] = useTable(tables.classroom.where(x => x.id.eq(BigInt(props.id))));

function selectRandomStudent(): void {
  const randomIndex = _.random(students.value.length, false)
  activeStudent.value = _.pullAt(students.value, randomIndex)[0]
  if (activeStudent.value) {
    selectedStudents.value.push(activeStudent.value);
  }
}

function reset(): void {
  const allStudents = _.drop(selectedStudents.value, 0);
  students.value.push(...allStudents);
  selectedStudents.value = [];
}
</script>

<template>
  <h1>{{ classroom[0].name }} {{ classroom[0].semester }} {{ classroom[0].year }}</h1>
  <RouterLink :to="`/class/${props.id}/edit`">Edit</RouterLink>

  <div class="container-vertical">
    <div class="selected-student">
      <span>Selected Student: </span>
      <span>{{ activeStudent?.firstName }} {{ activeStudent?.lastName }}</span>
    </div>

    <div class="container">
      <div id="active-students" class="container-vertical students">
        <span v-for="(student, index) in people" :key="index">{{ student.name }}</span>
      </div>

      <button class="button" @click="selectRandomStudent">Select Student</button>

      <button class="button" @click="reset">Reset</button>
      <div id="selected-students" class="container-vertical">
        <span v-for="student in selectedStudents">{{ student.firstName }} {{ student.lastName }} </span>
      </div>
    </div>
  </div>
</template>

<style>
.selected-student {
  height: 33%;
  width: 100%
}

.students {
  height: 100%;
  gap: 8px;
  margin: 10px;
}

#selected-students {
  color: gray
}
</style>
