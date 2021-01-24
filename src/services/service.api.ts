import axios, { AxiosResponse, AxiosStatic } from "axios";
import { DBStore, Task } from "@/models/base";

export default class ServiceApi {
  baseUrl: string;
  axios: AxiosStatic;
  constructor(url: string) {
    if (url) {
      this.baseUrl = url;
    } else {
      console.error("No DB_URL");
      this.baseUrl = "";
    }
    this.axios = this.initAxios();
  }

  initAxios(): AxiosStatic {
    const _axios = axios;
    _axios.defaults.baseURL = process.env.BASE_URL;
    _axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    return _axios;
  }

  async getDBStore(): Promise<AxiosResponse<DBStore>> {
    return await this.axios.get(this.baseUrl);
  }

  async updateDBStore(taskList: Task[]): Promise<AxiosResponse> {
    return await this.axios.patch(this.baseUrl, { tasks: taskList });
  }
}
