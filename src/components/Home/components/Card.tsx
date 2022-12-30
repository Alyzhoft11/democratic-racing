import {
  ArrowDownIcon,
  ArrowUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type { TForum } from "../../../types";
import { trpc } from "../../../utils/trpc";
import clsx from "clsx";

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

  const getUpVoted = () => {
    const vote = forum.ForumVote.find(
      (vote) => vote.userId === session.data?.user?.id && vote.upVote === true
    );

    if (vote) {
      return true;
    }

    return false;
  };

  const getDownVoted = () => {
    const vote = forum.ForumVote.find(
      (vote) => vote.userId === session.data?.user?.id && vote.downVote === true
    );

    if (vote) {
      return true;
    }

    return false;
  };

  const getVoted = () => {
    const vote = forum.ForumVote.find(
      (vote) => vote.userId === session.data?.user?.id
    );

    return vote;
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
          <button
            onClick={(event) => {
              event.stopPropagation();
              const vote = getVoted();

              if (vote) {
                if (vote.upVote === false) {
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
                } else {
                  deleteVote(
                    { id: vote.id },
                    {
                      onSuccess: () => {
                        utils.forum.getAll.invalidate();
                      },
                    }
                  );
                }
              } else {
                upVote(
                  { id: forum.id },
                  {
                    onSuccess: () => {
                      utils.forum.getAll.invalidate();
                    },
                  }
                );
              }
            }}
          >
            <ArrowUpIcon
              className={clsx(
                "h-6",
                getUpVoted() ? "text-green-600" : "hover:text-green-600"
              )}
            />
          </button>
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
          <button
            onClick={(event) => {
              event.stopPropagation();
              const vote = getVoted();
              if (vote) {
                if (vote.downVote === false) {
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
                } else {
                  deleteVote(
                    { id: vote.id },
                    {
                      onSuccess: () => {
                        utils.forum.getAll.invalidate();
                      },
                    }
                  );
                }
              } else {
                downVote(
                  { id: forum.id },
                  {
                    onSuccess: () => {
                      utils.forum.getAll.invalidate();
                    },
                  }
                );
              }
            }}
          >
            <ArrowDownIcon
              className={clsx(
                "h-6",
                getDownVoted() ? "text-red-600" : "hover:text-red-600"
              )}
            />
          </button>
        </div>
        <div className="flex h-full flex-1 flex-col">
          <div className="h-4/5 border-b-2">
            <div className="mb-6">
              <h4 className=" text-2xl font-bold">{forum.title}</h4>
            </div>
            <p className=" text-gray-500">{forum.text}</p>
          </div>
          <div className="flex flex-1 items-center space-x-2 ">
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
                <a href="" className="text-blue-600 hover:underline">
                  {forum.user.name}
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
