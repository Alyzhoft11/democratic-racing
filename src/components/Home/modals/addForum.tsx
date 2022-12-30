import Modal from "../../ui/modal";
import { z } from "zod";
import { Form, useZodForm } from "../../ui/form";
import { SubmitButton } from "../../ui/SubmitButton";
import { trpc } from "../../../utils/trpc";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const schema = z.object({
  text: z.string().min(1),
  title: z.string().min(1),
});

export default function AddForum({ open, setOpen }: Props) {
  const { mutate } = trpc.forum.createForum.useMutation();
  const utils = trpc.useContext();

  const form = useZodForm({
    schema,
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
            mutate(value, {
              onSuccess: () => {
                utils.forum.getAll.invalidate();
                form.reset();
                setOpen(false);
              },
              onError: (error) => {
                throw new Error(error.message);
              },
            });
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
