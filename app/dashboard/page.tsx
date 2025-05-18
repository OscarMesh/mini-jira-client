"use client";

import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/mutations/use-tasks";
import { type Task as TaskType } from "@/services/tasks-services";
import { TaskBoardSkeleton } from "@/components/dashboard/TaskBoardSkeleton";
import { TaskListSkeleton } from "@/components/dashboard/TaskListSkeleton";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { TaskBoard } from "@/components/dashboard/TaskBoard";
import { TaskList } from "@/components/dashboard/TaskList";

export type Task = TaskType;

export default function Dashboard() {
  const [view, setView] = useState<"board" | "list">("board");
  const [filters, setFilters] = useState({
    status: undefined as Task["status"] | undefined,
    priority: undefined as Task["priority"] | undefined,
    search: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const newFilters = { ...filters };

    const status = searchParams.get("status") as Task["status"];
    const priority = searchParams.get("priority") as Task["priority"];
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (status) newFilters.status = status;
    if (priority) newFilters.priority = priority;
    if (search) newFilters.search = search;
    if (page) newFilters.page = parseInt(page);
    if (limit) newFilters.limit = parseInt(limit);

    setFilters(newFilters);
  }, []);

  const { data, isLoading, error } = useTasks(filters);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error loading tasks
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <div className="flex justify-center md:justify-end mb-4">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>
        {isLoading ? (
          view === "board" ? (
            <TaskBoardSkeleton />
          ) : (
            <TaskListSkeleton />
          )
        ) : view === "board" ? (
          <TaskBoard tasks={data?.tasks || []} />
        ) : (
          <TaskList tasks={data?.tasks || []} />
        )}
      </div>
    </div>
  );
}
