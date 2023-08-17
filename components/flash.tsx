"use client";

import { useFlashStore } from "@/hooks/use-flash-store";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function Flash() {
  const message = useFlashStore((state) => state.message);
  const setMessage = useFlashStore((state) => state.setMessage);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (message && messageRef.current) {
      messageRef.current.textContent = message;

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    // eslint-disable-next-line
  }, [message]);

  return (
    <div
      className={clsx("overflow-hidden", {
        "h-0 transition-height duration-500": !message,
        "h-[105.52px]": message,
      })}
    >
      <h2 className="pl-[24px]">
        <Image src="/images/ui/girl.gif" alt="Girl" height={40} width={18} />
      </h2>
      <div className="mt-[6px] bg-arr2 bg-[25px_0] bg-no-repeat pt-[11px]"></div>
      <div className="mb-[4px]">
        <p
          className="rounded bg-white p-[7px] text-[25.44px] font-bold leading-[1.2]"
          ref={messageRef}
        ></p>
      </div>
    </div>
  );
}
