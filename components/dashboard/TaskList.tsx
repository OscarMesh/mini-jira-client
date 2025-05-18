import React from "react";
import { Card } from "@/components/ui/card";
import { type Task } from "@/services/tasks-services";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <div className="flex items-center gap-4">
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
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    task.status === "TODO"
                      ? "bg-blue-100 text-blue-800"
                      : task.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
