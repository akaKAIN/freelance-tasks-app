<template>
  <div class="card" v-if="isValidId">
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
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script lang="ts">
import AppStatus from "@/components/AppStatus.vue";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { StatusType, Task } from "@/models/base";

export default {
  props: { id: { type: String, required: true } },
  components: { AppStatus },
  setup(props: { id: string }) {
    const store = useStore();
    const tasks = computed<Task[]>(() => store.getters.tasks);
    const currentTask = computed<Task | undefined>(() => {
      return tasks.value.find((task: Task) => task.id === props.id);
    });
    console.log("currentTask: ", currentTask.value);
    const changeStatus = (newStatus: StatusType) => {
      if (currentTask.value !== undefined) {
        currentTask.value.status = newStatus;
      }
    };

    watch(currentTask, (newVal, oldVal) =>
      console.log("watch: ", newVal, oldVal)
    );

    const isValidId = (): boolean => currentTask.value !== undefined;

    return { isValidId, currentTask, changeStatus };
  }
};
</script>
