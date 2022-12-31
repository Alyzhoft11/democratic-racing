import type { TComment } from "../../../types";
import Image from "next/image";

interface Props {
  comment: TComment;
}

export default function Comment({ comment }: Props) {
  return (
    <div className="flex items-center space-x-2">
      {comment.user?.image && (
        <Image
          src={comment.user.image}
          height={36}
          width={36}
          className="rounded-full"
          alt="User Image"
        />
      )}
      <div>
        <div className="flex space-x-2">
          <div className=" font-semibold">{comment.user?.name}</div>
          <div className=" text-gray-500">
            {comment.createdAt.toDateString()}
          </div>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
