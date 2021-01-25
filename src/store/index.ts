import { createStore } from "vuex";
import { DBStore, Task } from "@/models/base";
import ServiceApi from "@/services/service.api";
import { AxiosResponse } from "axios";

const url = "https://vue3-work-with-db-default-rtdb.firebaseio.com/";
const tableName = "tasks.json";
const serviceAPI = new ServiceApi(url + tableName);

export default createStore({
  state: { tasks: Array<Task>(), currentTask: Object as () => Task },
  getters: {
    tasks: state => state.tasks,
    currentTask: state => (id: string) =>
      state.tasks.find((task: Task) => task.id === id)
  },
  mutations: {
    getTaskListFromAPI: async state => {
      try {
        const response: AxiosResponse<DBStore> = await serviceAPI.getDBStore();
        if (response.status === 200) {
          state.tasks = response.data ? response.data.tasks : [];
        }
      } catch (err) {
        console.error("Error in get tasks: ", err);
      }
    },

    addTask: async (state, task: Task) => {
      try {
        const instanceTasks: Task[] = [...state.tasks, task];
        const response: AxiosResponse = await serviceAPI.updateDBStore({
          tasks: instanceTasks
        });
        if (response.status === 200) {
          state.tasks = instanceTasks;
        }
      } catch (err) {
        console.error("Error by adding new Task");
      }
    },

    updateTasksInAPI: async (state, DBStore: DBStore) => {
      try {
        const response = await serviceAPI.updateDBStore(DBStore);
        if (response.status === 200) {
          console.log("store was updated", response);
        }
      } catch (err) {
        console.error("Error by updating DBStore");
      }
    }
  },
  actions: {
    getTaskListFromAPI: ({ commit }) => commit("getTaskListFromAPI"),
    addTask: ({ commit }, task: Task) => commit("addTask", task),
    updateTasksInAPI: ({ commit }, dbStore: DBStore) =>
      commit("updateTasksInAPI", dbStore)
  },
  modules: {}
});
