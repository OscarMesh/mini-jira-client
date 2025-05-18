import { Skeleton } from "@/components/ui/skeleton";

export function TaskBoardSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
        <div key={status} className="bg-white rounded-lg shadow p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 p-3 rounded border border-gray-200"
              >
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
                <div className="mt-2 flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
