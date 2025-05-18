import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import { type Task } from "@/services/tasks-services";
import { useTaskMutations } from "@/hooks/mutations/use-tasks";
import { TaskCard } from "./TaskCard";

interface TaskBoardProps {
  tasks: Task[];
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  const { mutate: updateTask } = useTaskMutations();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    updateTask({
      ...task,
      status: newStatus,
    });
  };

  const columns = [
    { key: "TODO", label: "To Do" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "DONE", label: "Done" },
  ];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-4">{col.label}</h3>
            <DroppableColumn id={col.key}>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === col.key)
                  .map((task) => (
                    <DraggableTaskCard key={task.id} task={task} />
                  ))}
              </div>
            </DroppableColumn>
          </div>
        ))}
      </div>
    </DndContext>
  );
}

// Droppable column
const DroppableColumn = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[300px] transition-colors ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      {children}
    </div>
  );
};

// Draggable task card wrapper
const DraggableTaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id!,
    });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      <TaskCard task={task} />
    </div>
  );
};
