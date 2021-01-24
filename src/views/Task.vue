<template>
  <div class="card" v-if="isValidId">
    <h2>{{ title }}</h2>
    <p><strong>Status</strong>: <app-status :type="'done'"></app-status></p>
    <p><strong>Deadline</strong>: {{ new Date().toLocaleDateString() }}</p>
    <p><strong>Description</strong>: {{ description }}</p>
    <div>
      <button class="btn">Take to work</button>
      <button class="btn primary">To complete</button>
      <button class="btn danger">Cancel</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";

export default {
  emits: ["change-status"],
  props: { id: String },
  components: { AppStatus },
  setup(props) {
    const isValidId = () => true;

    return { isValidId };
  }
};
</script>
