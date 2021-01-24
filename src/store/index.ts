import { createStore } from "vuex";
import { DBStore, Task } from "@/models/base";
import ServiceApi from "@/services/service.api";
import { AxiosResponse } from "axios";

const url = "https://vue3-work-with-db-default-rtdb.firebaseio.com/";
const tableName = "tasks.json";
const serviceAPI = new ServiceApi(url + tableName);

export default createStore({
  state: { tasks: Array<Task>() },
  getters: { tasks: state => state.tasks },
  mutations: {
    getTaskListFromAPI: async state => {
      try {
        const response: AxiosResponse<DBStore> = await serviceAPI.getDBStore();
        state.tasks = response.data ? response.data.tasks : [];
      } catch (err) {
        console.error("Error in get tasks: ", err);
      }
    },

    addTask: (state, payload: Task) => {
      state.tasks.push(payload);
    }
  },
  actions: {
    getTaskListFromAPI: ({ commit }) => commit("getTaskListFromAPI"),
    addTask: (context, payload: Task) => context.commit("addTask", payload)
  },
  modules: {}
});
