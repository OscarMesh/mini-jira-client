import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ConfirmModalProps {
  title: string;
  subTitle: string;
  openModal: boolean;
  className?: string;
  setOpenModal: (openModal: boolean) => void;
  children?: React.ReactNode;
  action?: () => void;
  closeAction?: () => void;
  showCloseIcon?: boolean;
  isLoading?: boolean;
  iconClasses?: string[];
  closeButtonText?: string;
  actionButtonText?: string;
  disableActionButtion?: boolean;
  actionButtonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export const ConfirmModal = ({
  title,
  subTitle,
  openModal,
  setOpenModal,
  className,
  children,
  action,
  closeAction,
  isLoading = false,
  iconClasses = ["bg-red-100", "fill-error", "bg-error"],
  closeButtonText = "Cancel",
  actionButtonText = "Delete",
  actionButtonVariant = "destructive",
  disableActionButtion,
}: ConfirmModalProps) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent className={cn("px-0 sm:max-w-md", className)}>
        <div className="flex items-start justify-start text-left">
          <div>
            <DialogHeader className="px-3 text-left">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="text-base">
                {subTitle}
              </DialogDescription>
            </DialogHeader>
            {children}
          </div>
        </div>
        <DialogFooter className="gap-3 px-4 sm:gap-0">
          <Button
            variant="ghost"
            className="shadow-none"
            onClick={() => (closeAction ? closeAction() : setOpenModal(false))}
          >
            {closeButtonText}
          </Button>
          <Button
            disabled={isLoading || disableActionButtion}
            variant={actionButtonVariant}
            onClick={action && action}
            // isLoading={isLoading}
          >
            <span className="flex items-center">{actionButtonText}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
