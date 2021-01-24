export type StatusType = "active" | "einprogress" | "done" | "canceled";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  deadline: string;
}

export interface DBStore {
  tasks: Task[];
}

export enum Statuses {
  active = "Active",
  done = "Done",
  canceled = "Cancel",
  einprogress = "In work"
}
