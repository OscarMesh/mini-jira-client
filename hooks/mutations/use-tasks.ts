import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  type GetTasksParams,
  type Task,
} from "@/services/tasks-services";
import { toast } from "sonner";

export const useTasks = (params: GetTasksParams = {}) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getTasks(params),
    select: (response) => ({
      tasks: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    }),
  });
};

export const useTaskMutations = (closeModal?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Task) => {
      const { id, ...rest } = data;
      if (id) {
        const response = await updateTask(id, rest);
        return response;
      } else {
        const response = await createTask(rest);
        return response;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal?.();
      toast.success(
        `Task ${variables.id ? "updated" : "created"} successfully`
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update task");
    },
  });

  return mutation;
};

export const useDeleteTask = (taskId?: string, closeModal?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteTask(taskId ?? "");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal?.();
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
