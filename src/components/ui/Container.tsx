import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="mx-auto mt-20 max-w-7xl flex-1 px-4 sm:px-6 md:px-8">
      {children}
    </div>
  );
}
