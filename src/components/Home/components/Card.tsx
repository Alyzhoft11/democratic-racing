import {
  ChatBubbleBottomCenterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type { TForum } from "../../../types";
import { trpc } from "../../../utils/trpc";
import clsx from "clsx";
import { UpVote } from "./UpVote";
import { DownVote } from "./DownVote";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  forum: TForum;
}

export default function Card({ forum, ...props }: Props) {
  const session = useSession();
  const { mutate } = trpc.forum.deleteForum.useMutation();
  const { mutate: upVote } = trpc.forum.upVote.useMutation();
  const { mutate: downVote } = trpc.forum.downVote.useMutation();
  const { mutate: editVote } = trpc.forum.editVote.useMutation();
  const { mutate: deleteVote } = trpc.forum.deleteVote.useMutation();
  const utils = trpc.useContext();

  const getVoteCount = () => {
    const upVote = forum.ForumVote.filter((vote) => vote.upVote === true);
    const downVote = forum.ForumVote.filter((vote) => vote.downVote === true);

    return upVote.length - downVote.length;
  };

  return (
    <div
      className="relative flex h-64 w-4/5 cursor-pointer justify-start rounded-lg border-2 bg-white p-4 shadow-md hover:shadow-xl"
      {...props}
    >
      {session.data?.user?.id === forum.user.id && (
        <div className="absolute right-5">
          <button
            onClick={(event) => {
              event.stopPropagation();
              mutate(
                { id: forum.id },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
          >
            <TrashIcon className="h-6 w-6 hover:shadow-md" />
          </button>
        </div>
      )}

      <div className=" flex w-full">
        <div className=" flex w-1/12 flex-col items-center space-y-2 ">
          <UpVote
            forum={forum}
            session={session.data}
            upVote={() => {
              upVote(
                { id: forum.id },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
            editVote={(vote) => {
              editVote(
                {
                  id: vote.id,
                  upVote: vote.upVote,
                  downVote: vote.downVote,
                },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
            deleteVote={(vote) => {
              deleteVote(
                { id: vote.id },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
          />
          <div
            className={clsx(
              getVoteCount() === 0
                ? "text-slate-200"
                : getVoteCount() > 0
                ? "text-green-600"
                : "text-red-600"
            )}
          >
            {getVoteCount()}
          </div>
          <DownVote
            forum={forum}
            session={session.data}
            downVote={() => {
              downVote(
                { id: forum.id },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
            editVote={(vote) => {
              editVote(
                {
                  id: vote.id,
                  upVote: vote.upVote,
                  downVote: vote.downVote,
                },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
            deleteVote={(vote) => {
              deleteVote(
                { id: vote.id },
                {
                  onSuccess: () => {
                    utils.forum.getAll.invalidate();
                  },
                }
              );
            }}
          />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <div className="h-4/5 border-b-2">
            <div className="mb-6">
              <h4 className=" text-2xl font-bold">{forum.title}</h4>
            </div>
            <p className=" text-gray-500">{forum.text}</p>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 ">
            <div className="flex space-x-2">
              {forum.user.image && (
                <Image
                  src={forum.user.image}
                  height={24}
                  width={24}
                  className="rounded-full"
                  alt="User Image"
                />
              )}

              <p>
                Posted By:
                <span>
                  {" "}
                  <button>
                    <a href="" className="text-blue-600 hover:underline">
                      {forum.user.name}
                    </a>
                  </button>
                </span>
              </p>
            </div>

            <div className=" text-slate-500">
              Created: {forum.createdAt.toDateString()}
            </div>
            <div className="flex">
              <ChatBubbleBottomCenterIcon className="h-6 w-6" />
              {forum.ForumComment.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
