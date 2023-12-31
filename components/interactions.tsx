"use client";

import { useFlash } from "@/hooks/use-flash-store";
import { useLoadingTransition } from "@/hooks/use-loading-transition";
import { useUpdateFormStore } from "@/hooks/use-update-form-store";
import { deleteUpdate } from "@/lib/actions/update/delete-update";
import { postFavorite } from "@/lib/actions/update/post-favorite";
import { getErrorMessage } from "@/lib/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import { ReplyIcon } from "./icons/reply";
import { StarIcon } from "./icons/star";
import { TrashIcon } from "./icons/trash";

interface InteractionsProps extends React.HTMLAttributes<HTMLDivElement> {
  update: { id: number; username: string; favorited: boolean };
  username?: string;
  visible?: boolean;
}

export function Interactions({
  update,
  username,
  visible = false,
  className,
}: InteractionsProps) {
  const flash = useFlash();
  const setText = useUpdateFormStore((state) => state.setText);
  const router = useRouter();

  const [isPending, startTransition] = useLoadingTransition();

  const handleFavorite = async (id: number) => {
    try {
      await postFavorite(id);
    } catch (error) {
      flash(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmDelete = confirm(
        "Sure you want to delete this update? There is NO undo!"
      );
      if (confirmDelete) await deleteUpdate(id);
    } catch (error) {
      flash(getErrorMessage(error));
    }
  };

  if (!username) return null;

  return (
    <div
      className={clsx("mx-auto my-[3px] flex flex-col items-center", className)}
    >
      <button
        title={
          update.favorited ? "remove from favorites" : "favorite this update"
        }
        className={clsx({
          "opacity-0 group-hover:opacity-100": !visible,
          "opacity-100": update.favorited,
        })}
        onClick={() => {
          startTransition(() => handleFavorite(update.id));
        }}
        disabled={isPending}
      >
        <StarIcon favorited={update.favorited} />
      </button>
      {username === update.username ? (
        <button
          title="delete this update"
          className={clsx("mt-[6px]", {
            "opacity-0 group-hover:opacity-100": !visible,
          })}
          disabled={isPending}
          onClick={() => {
            startTransition(() => handleDelete(update.id));
          }}
        >
          <TrashIcon />
        </button>
      ) : (
        <button
          title={`reply to ${update.username}`}
          className={clsx("mt-[6px]", {
            "opacity-0 group-hover:opacity-100": !visible,
          })}
          onClick={() => {
            setText(`@${update.username} `);
            router.push("/home");
          }}
        >
          <ReplyIcon />
        </button>
      )}
    </div>
  );
}
