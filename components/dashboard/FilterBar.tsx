import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { type Task } from "@/services/tasks-services";
import { pushParam, removeParam } from "@/lib/utils";
import { NewTaskAction } from "./NewTaskAction";

type FilterBarProps = {
  filters: {
    status?: Task["status"];
    priority?: Task["priority"];
    search: string;
    page: number;
    limit: number;
  };
  onFilterChange: (filters: Partial<FilterBarProps["filters"]>) => void;
};

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleFilterChange = (
    key: keyof FilterBarProps["filters"],
    value: any
  ) => {
    if (value) {
      pushParam(key, value);
    } else {
      removeParam(key);
    }
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    removeParam(["status", "priority", "search"]);
    onFilterChange({
      status: undefined,
      priority: undefined,
      search: "",
    });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <NewTaskAction />
      <Input
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        className="w-full sm:w-64"
      />
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Select
          value={filters.status}
          onValueChange={(value: Task["status"]) =>
            handleFilterChange("status", value)
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">Todo</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.priority}
          onValueChange={(value: Task["priority"]) =>
            handleFilterChange("priority", value)
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
