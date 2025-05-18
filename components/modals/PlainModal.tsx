import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

interface FormModalProps {
  header?: React.ReactNode;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  children: React.ReactNode;
}

export const PlainModal = ({
  header,
  openModal,
  setOpenModal,
  children,
}: FormModalProps) => {
  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent className="px-0 sm:max-w-xl" aria-labelledby="">
        <DialogHeader className="space-y-0 px-4 text-left">
          {header}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
