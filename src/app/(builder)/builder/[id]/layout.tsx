import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div dir="ltr" className="flex w-full flex-grow mx-auto h-full">{children}</div>;
}

export default layout;
