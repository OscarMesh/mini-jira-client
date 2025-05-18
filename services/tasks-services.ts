import { axiosInstance } from "@/lib/axios";

export type Task = {
  id?: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type TasksResponse = {
  data: {
    data: Task[];
    total: number;
    page: number;
    limit: number;
  };
};

export type GetTasksParams = {
  limit?: number;
  page?: number;
  status?: Task["status"];
  priority?: Task["priority"];
  search?: string;
};

export const getTasks = async (
  params: GetTasksParams = {}
): Promise<TasksResponse> => {
  const { data } = await axiosInstance.get("/tasks", { params });
  return data;
};

export const createTask = async (data: Task) => {
  const { data: response } = await axiosInstance.post("/tasks", data);
  return response;
};

export const updateTask = async (id: string, data: Task) => {
  const { data: response } = await axiosInstance.put(`/tasks/${id}`, data);
  return response;
};

export const deleteTask = async (id: string) => {
  const { data: response } = await axiosInstance.delete(`/tasks/${id}`);
  return response;
};
