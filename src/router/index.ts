import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Tasks from "@/views/Tasks.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Tasks",
    component: Tasks
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
