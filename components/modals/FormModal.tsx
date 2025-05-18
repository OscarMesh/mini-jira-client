import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface FormModalProps {
  title: string;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  children: React.ReactNode;
  classname?: string;
}

export const FormModal = ({
  title,
  openModal,
  setOpenModal,
  children,
  classname,
}: FormModalProps) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent
        className={cn(classname, "flex flex-col px-1 sm:max-w-md max-h-[90vh]")}
      >
        <DialogHeader className="space-y-0 px-4 text-left">
          <DialogTitle className="font-medium">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
