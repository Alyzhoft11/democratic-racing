import { useState } from "react";
import type { TForum } from "../../types";
import { trpc } from "../../utils/trpc";
import Button from "../ui/Button";
import Card from "./components/Card";
import AddForum from "./modals/addForum";
import EditForum from "./modals/editForum";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [forum, setForum] = useState<TForum | undefined>(undefined);
  const { data } = trpc.forum.getAll.useQuery();

  return (
    <div>
      <AddForum open={open} setOpen={() => setOpen(false)} />
      {forum && (
        <EditForum
          open={true}
          setOpen={() => setForum(undefined)}
          forum={forum}
        />
      )}

      <div className="flex ">
        <main className=" flex w-full flex-1 flex-col items-center space-y-2">
          {data?.map((forum) => {
            return (
              <Card
                key={forum.id}
                forum={forum}
                onClick={() => console.log("clicked")}
              />
            );
          })}
        </main>

        <section className="w-1/4">
          <div className="flex justify-end">
            <Button
              className=" mx-4 w-full rounded-md bg-green-400 p-4 shadow-lg hover:bg-green-500 hover:shadow-xl"
              onClick={() => setOpen(true)}
            >
              + Start New Topic
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
