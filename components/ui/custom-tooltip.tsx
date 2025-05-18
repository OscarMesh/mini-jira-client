import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
  className = "",
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <span className={`cursor-help ${className}`}>{children}</span>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-primary text-white rounded-md px-3 py-2 text-xs shadow-sm"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
