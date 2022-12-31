import clsx from "clsx";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className={clsx("rounded-md bg-green-400 p-2 shadow-lg", props.className)}
      // {...props}
    >
      {children}
    </button>
  );
}
