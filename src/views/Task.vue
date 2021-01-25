<template>
  <div class="loader" v-if="isLoading"></div>
  <div class="card" v-if="currentTask">
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
import { computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import { StatusType, Task } from "@/models/base";

export default {
  props: { id: { type: String, required: true } },
  components: { AppStatus },
  setup(props: { id: string }) {
    const store = useStore();
    const isLoading = ref<boolean>(true);
    store.commit("getTaskListFromAPI");
    const currentTask = computed<Task>(() =>
      store.getters.currentTask(props.id)
    );
    isLoading.value = false;
    const changeStatus = (newStatus: StatusType) => {
      currentTask.value.status = newStatus;
    };

    watch<Task>(currentTask, () => (isLoading.value = false));

    return { isLoading, currentTask, changeStatus };
  }
};
</script>
