import { Task } from "@/services/tasks-services";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { FormModal } from "../modals/FormModal";
import { TasksForm } from "../forms/TasksForm";
import { ConfirmModal } from "../modals/ConfirmModal";
import { useState } from "react";
import { useDeleteTask } from "@/hooks/mutations/use-tasks";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(task.id);

  return (
    <>
      <div className="bg-gray-50 p-3 rounded border border-gray-200">
        <h4 className="font-medium">{task.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs ${
                task.priority === "HIGH"
                  ? "bg-red-100 text-red-800"
                  : task.priority === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {task.priority}
            </span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenModal(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenConfirmModal(true)}
            >
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>

      <FormModal
        title="Edit Task"
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <TasksForm
          task={task || undefined}
          closeModal={() => setOpenModal(false)}
        />
      </FormModal>

      <ConfirmModal
        title="Delete Task"
        subTitle="Are you sure you want to delete this task?"
        openModal={openConfirmModal}
        setOpenModal={setOpenConfirmModal}
        action={() => deleteTask()}
        isLoading={isDeleting}
        actionButtonText="Delete"
        actionButtonVariant="destructive"
        disableActionButtion={isDeleting}
      />
    </>
  );
};
