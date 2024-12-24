import React from "react";
import { ScrollArea } from "@ui/scroll-area";

export default function PageContainer({ children, scrolllable }: { children: React.ReactNode; scrolllable?: boolean }) {
  return (
    <>
      {scrolllable ? (
        <ScrollArea className="h-[calc(100dvh-3.25rem)]">
          <div className="h-full p-4 md:px-6">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-6">{children}</div>
      )}
    </>
  );
}
