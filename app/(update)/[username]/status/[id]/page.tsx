import { Interactions } from "@/components/interactions";
import { getUpdate } from "@/lib/actions/update/get-update";
import { auth } from "@/lib/auth";
import {
  formatUpdateCreatedAt,
  formatUpdateCreatedAtTitle,
  formatUpdateText,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface StatusProps {
  params: { username: string; id: string };
}

export default async function Status({
  params: { id, username },
}: StatusProps) {
  const update = await getUpdate(id);
  if (update.username !== username)
    redirect(`/${update.username}/status/${id}`);

  const session = await auth();

  const text = formatUpdateText(update.text);
  const createdAt = formatUpdateCreatedAt(update.createdAt);
  const title = formatUpdateCreatedAtTitle(update.createdAt);

  return (
    <div className="p-[20px]">
      <div className="group flex">
        <div>
          <p className="w-[550px] font-georgia text-[25.2px] font-normal leading-[1.1]">
            {text}
          </p>
          <div className="m-[13px_0_0_3px] mt-[10px] font-georgia text-[15.6px] italic leading-[1] text-meta">
            <Link
              href={`/${update.username}/status/${id}`}
              className="text-meta group-hover:text-links"
              title={title}
            >
              {createdAt}
            </Link>{" "}
            from{" "}
            {update.application.url ? (
              <Link
                href={update.application.url}
                className="text-meta group-hover:text-links"
              >
                {update.application.name}
              </Link>
            ) : (
              update.application.name
            )}{" "}
            {update.parent && (
              <Link
                href={`/${update.parent.username}/status/${update.parent.id}`}
                className="text-meta group-hover:text-links"
              >
                in reply to {update.parent.username}
              </Link>
            )}
          </div>
        </div>
        {session?.user && (
          <Interactions
            username={session.user.username}
            className="mt-[8px]"
            update={update}
            visible
          />
        )}
      </div>
      <div className="mt-[15px] flex h-[89px] items-start border-t border-t-gray pt-[15px] leading-[1]">
        <Link href={`/${update.username}`} className="mr-[20px]">
          <Image
            src={update.picture}
            alt={`${update.username}'s picture`}
            height={48}
            width={48}
            quality={100}
            draggable={false}
          />
        </Link>
        <div>
          <Link href={`/${update.username}`} className="text-[27.6px]">
            <span>{update.username}</span>
          </Link>
          {update.username !== update.name && (
            <span className="mt-[3px] block text-[14.4px]">{update.name}</span>
          )}
        </div>
      </div>
    </div>
  );
}