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
  </form>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { StatusType } from "@/models/base";
import {useRouter} from "vue-router";

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

    const router = useRouter();
    const store = useStore();
    const defaultStatus: StatusType = "active";
    const idGenerator = () => Math.floor(Math.random() * 10e12).toString();
    const generateTask = () => ({
      id: idGenerator(),
      title: title.value,
      description: description.value,
      status: defaultStatus,
      deadline: deadline.value
    });

    const createTask = () =>
      store.dispatch("addTask", generateTask()).then(() => router.push("/"));

    return { title, deadline, description, isValidForm, createTask };
  }
};
</script>
