import axios, { AxiosResponse, AxiosStatic } from "axios";
import { DBStore } from "@/models/base";

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

  getDBStore(): Promise<AxiosResponse<DBStore>> {
    return this.axios.get(this.baseUrl);
  }

  updateDBStore(dbStore: DBStore): Promise<AxiosResponse> {
    return this.axios.patch(this.baseUrl, dbStore);
  }
}
