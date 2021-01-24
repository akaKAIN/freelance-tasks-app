import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterOptions
} from "vue-router";
import Tasks from "@/views/Tasks.vue";
import Task from "@/views/Task.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/tasks",
    alias: "/",
    name: "tasks",
    component: Tasks
  },
  {
    path: "/new",
    name: "new",
    component: () => import("@/views/New.vue")
  },
  {
    path: "/task/:id",
    name: "task",
    component: Task,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});

export default router;
