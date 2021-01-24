<template>
  <h1 class="text-white center" v-if="!taskList.length">Задач пока нет</h1>
  <template v-else>
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
import { computed, onMounted } from "vue";
import { Task } from "@/models/base";

export default {
  components: { AppStatus },
  setup() {
    const store = useStore();

    const taskList = computed<Task[]>(() => store.getters.tasks);
    const activeTasksQuantity = computed<number>(
      () =>
        taskList.value.filter((task: Task) => task.status === "active").length
    );
    onMounted(() => {
      store.dispatch("getTaskListFromAPI");
    });
    // watch(taskList, () => {
    //   store.dispatch("setTaskList", taskList);
    // });

    return { taskList, activeTasksQuantity };
  }
};
</script>
