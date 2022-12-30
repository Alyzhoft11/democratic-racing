import Modal from "../../ui/modal";
import { z } from "zod";
import { Form, useZodForm } from "../../ui/form";
import { SubmitButton } from "../../ui/SubmitButton";
import { trpc } from "../../../utils/trpc";
import type { TForum } from "../../../types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  forum: TForum;
}

const schema = z.object({
  text: z.string().min(1),
  title: z.string().min(1),
});

export default function EditForum({ open, setOpen, forum }: Props) {
  const { mutate } = trpc.forum.editForum.useMutation();
  const utils = trpc.useContext();

  const form = useZodForm({
    schema,
    defaultValues: {
      text: forum.text,
      title: forum.title,
    },
  });

  return (
    <div>
      <Modal
        open={open}
        setOpen={(open) => {
          form.reset();
          setOpen(open);
        }}
      >
        <Form
          form={form}
          onSubmit={(value) => {
            mutate({ ...value, id: forum.id });
            form.reset();
            utils.poll.getAll.invalidate();
            setOpen(false);
          }}
        >
          <label className="text-lg font-bold">Title</label>
          <input
            className="rounded-md border-2 p-2 shadow-lg"
            type="text"
            {...form.register("title")}
          />
          <label className="text-lg font-bold">Text</label>
          <textarea
            className="rounded-md border-2 p-2 shadow-lg"
            {...form.register("text")}
          />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Modal>
    </div>
  );
}
