import { useSession } from "next-auth/react";
import Image from "next/image";
import type { TForum } from "../../../types";
import Modal from "../../ui/modal";
import Button from "../../ui/Button";
import { z } from "zod";
import { Form, useZodForm } from "../../ui/form";
import { SubmitButton } from "../../ui/SubmitButton";
import { trpc } from "../../../utils/trpc";
import Comment from "../components/Comment";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  forum: TForum;
}

const schema = z.object({
  text: z.string().min(1).max(1000),
});

export default function Comments({ open, setOpen, forum }: Props) {
  const session = useSession();

  const { data: comments } = trpc.forum.getComments.useQuery({
    id: forum.id,
  });

  const { mutate: createComment } = trpc.forum.createComment.useMutation();
  const utils = trpc.useContext();

  const form = useZodForm({
    schema,
  });

  return (
    <Modal
      open={open}
      setOpen={(open) => {
        // form.reset();
        setOpen(open);
      }}
      size="lg:max-w-6xl"
      alignment="lg:items-start"
    >
      <div className="h-4/5 border-b-2">
        <div className="mb-6">
          <h4 className=" text-2xl font-bold">{forum.title}</h4>
        </div>
        <p className=" pb-2 text-gray-500">{forum.text}</p>
      </div>
      <div>
        <div className="mt-5">{comments && comments.length} Comments</div>
        <Form
          form={form}
          onSubmit={(value) => {
            createComment(
              {
                text: value.text,
                forumId: forum.id,
              },
              {
                onSuccess: () => {
                  form.reset();
                  utils.forum.getComments.invalidate();
                },
              }
            );
          }}
        >
          <div className="flex items-center">
            <div>
              {session.data?.user?.image && (
                <Image
                  src={session.data.user.image}
                  height={36}
                  width={36}
                  className="rounded-full"
                  alt="User Image"
                />
              )}
            </div>
            <div className="w-full p-4">
              <input
                type="text"
                placeholder={"Leave a comment..."}
                className=" w-full border-b-2 border-slate-300 outline-none"
                {...form.register("text")}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button className="bg-red-500">Cancel</Button>
            <SubmitButton>Comment</SubmitButton>
          </div>
        </Form>
      </div>
      <div className="flex flex-col space-y-2">
        {comments &&
          comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
      </div>
    </Modal>
  );
}
