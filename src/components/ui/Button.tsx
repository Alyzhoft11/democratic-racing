import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button className=" rounded-md bg-green-400 p-4 shadow-lg" {...props}>
      {children}
    </button>
  );
}
