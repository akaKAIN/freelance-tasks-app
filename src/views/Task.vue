<template>
  <div class="loader" v-if="isLoading"></div>
  <div class="card" v-if="currentTask && !isLoading">
    <h2>{{ currentTask.title }}</h2>
    <p>
      <strong>Status</strong>:
      <app-status :status="currentTask.status"></app-status>
    </p>
    <p><strong>Deadline</strong>: {{ currentTask.deadline }}</p>
    <p><strong>Description</strong>: {{ currentTask.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('einprogress')">
        Take to work
      </button>
      <button class="btn primary" @click="changeStatus('done')">
        To complete
      </button>
      <button class="btn danger" @click="changeStatus('canceled')">
        Cancel
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else-if="!currentTask && !isLoading">
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script lang="ts">
import AppStatus from "@/components/AppStatus.vue";
import { computed, ref, onUpdated } from "vue";
import { useStore } from "vuex";
import { StatusType, Task } from "@/models/base";
import { useRouter, useRoute } from "vue-router";

export default {
  props: { id: { type: String, required: true } },
  components: { AppStatus },
  setup(props: { id: string }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref<boolean>(true);
    onUpdated(() => (isLoading.value = false));

    store.commit("getTaskListFromAPI");
    const tasks = store.getters.tasks;
    const currentTask = computed<Task>(() =>
      store.getters.currentTask(props.id)
    );

    const changeStatus = (newStatus: StatusType) => {
      console.log(tasks);
      let idx = -1;
      tasks.find((task: Task, ind: number) => {
        if (task.id === props.id) {
          idx = ind;
        }
      });
      if (idx !== -1) {
        const instanceTask: Task = Object.assign({}, currentTask.value);
        instanceTask.status = newStatus;
        const instanceTaskList = store.getters.tasks;
        instanceTaskList.splice(idx, 1, instanceTask);
        store
          .dispatch("updateTasksInAPI", { tasks: instanceTaskList })
          .then(() => (currentTask.value.status = newStatus));
      } else {
        console.error("No match in tasks", route);
        router.push({ name: "task", params: { id: props.id } });
      }
    };

    return { isLoading, currentTask, changeStatus };
  }
};
</script>
