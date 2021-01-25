<template>
  <div class="loader" v-if="isLoading"></div>
  <h1 class="text-white center" v-if="!taskList.length && !isLoading">
    Задач пока нет
  </h1>
  <template v-else-if="!isLoading">
    <h3 class="text-white">Всего активных задач: {{ activeTasksQuantity }}</h3>
    <div class="card" v-for="task in taskList" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :status="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline }}
          </small>
        </strong>
      </p>
      <router-link :to="/task/ + task.id"
        ><button class="btn primary">Посмотреть</button></router-link
      >
    </div>
  </template>
</template>

<script lang="ts">
import AppStatus from "../components/AppStatus.vue";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated, ref } from "vue";
import { Task } from "@/models/base";

export default {
  components: { AppStatus },
  setup() {
    const store = useStore();
    const isLoading = ref<boolean>(true);

    const taskList = computed<Task[]>(() => store.getters.tasks);
    const activeTasksQuantity = computed<number>(
      () =>
        taskList.value.filter((task: Task) => task.status === "active").length
    );
    onMounted(() => {
      store.dispatch("getTaskListFromAPI");
    });

    onUpdated(() => (isLoading.value = false));

    return { isLoading, taskList, activeTasksQuantity };
  }
};
</script>
