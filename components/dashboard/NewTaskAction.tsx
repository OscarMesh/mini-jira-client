import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CustomTooltip } from "../ui/custom-tooltip";
import { FormModal } from "../modals/FormModal";
import { useState } from "react";
import { TasksForm } from "../forms/TasksForm";

export const NewTaskAction = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <CustomTooltip content="New Task">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpenModal(true)}
        >
          <PlusIcon className="w-4 h-4 " />
        </Button>
      </CustomTooltip>

      <FormModal
        title="New Task"
        openModal={openModal}
        setOpenModal={() => setOpenModal(false)}
      >
        <TasksForm closeModal={() => setOpenModal(false)} />
      </FormModal>
    </>
  );
};
