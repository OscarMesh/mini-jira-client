import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

interface FormModalProps {
  header?: React.ReactNode;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  children: React.ReactNode;
}

export const AlertModal = ({
  header,
  openModal,
  setOpenModal,
  children,
}: FormModalProps) => {
  return (
    <AlertDialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <AlertDialogContent
        className="px-8 lg:px-20 py-14 lg:py-16  sm:max-w-xl"
        aria-labelledby=""
      >
        <AlertDialogHeader className="space-y-0 px-4 text-left">
          {header}
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};
