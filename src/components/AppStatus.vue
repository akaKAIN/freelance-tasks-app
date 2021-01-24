<template>
  <span :class="['badge', currentStatusClass]">{{ status }}</span>
</template>

<script lang="ts">
import { Statuses, StatusType } from "@/models/base";
import { computed } from "vue";

export default {
  props: {
    status: String as () => StatusType
  },
  setup(props: { status: StatusType }) {
    //  warning: "einprogress", "canceled"
    const currentStatusClass = computed(() => {
      return props.status === "active" || props.status === "done"
        ? "primary"
        : "warning";
    });
    const status = computed(() => Statuses[props.status as StatusType]);

    // eslint-disable-next-line vue/no-dupe-keys
    return { currentStatusClass, status };
  }
};
</script>
