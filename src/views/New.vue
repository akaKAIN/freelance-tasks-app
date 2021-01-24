<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="deadline" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValidForm">Создать</button>
    <button class="btn" type="button" @click="show">show</button>
  </form>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Task } from "@/models/base";

export default {
  name: "New",
  setup() {
    const title = ref<string>("");
    const deadline = ref<string>("");
    const description = ref<string>("");

    const validLength = 3;
    const isValidForm = computed<boolean>(
      () =>
        title.value.length > validLength &&
        deadline.value.length > validLength &&
        description.value.length > validLength
    );

    const show = (): void => {
      console.log(title.value, deadline.value, description.value);
    };

    const store = useStore();
    const newTask: Task = {
      id: "3",
      title: title.value,
      description: description.value,
      status: "active",
      deadline: deadline.value
    };

    const createTask = () => store.dispatch("addTask", newTask);

    return { title, deadline, description, isValidForm, show, createTask };
  }
};
</script>
