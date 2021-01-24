export type StatusType = "active" | "in-progress" | "done" | "canceled";

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
