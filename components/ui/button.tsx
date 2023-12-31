import Image from "next/image";
import Link from "next/link";

export function JoinButton() {
  return (
    <Link
      href="/signup"
      className="border border-black bg-joinbutton p-[4.5px_36.5px] text-[14.5px] font-bold text-white hover:bg-joinbutton-hover hover:no-underline"
    >
      Join!
    </Link>
  );
}

export function SignupButton() {
  return (
    <Link
      href="/signup"
      className="w-[114px] border border-black bg-signupbutton p-[6px_18px] text-[21.5px] text-white hover:no-underline"
    >
      Get Started—Join!
    </Link>
  );
}

export function WatchButton() {
  return (
    <Link
      href="https://www.commoncraft.com/video/twitter"
      className="block w-full border border-black bg-watchbutton p-[2px_0] text-center align-middle text-[11pt] font-bold text-white hover:no-underline"
      target="_blank"
    >
      <Image
        src="/images/arrows/arrow_on_red.gif"
        className="mr-[5px] mt-[-3px] inline"
        height={13}
        width={12}
        quality={100}
        sizes="13px"
        alt="Arrow_on_red"
        draggable={false}
        priority={true}
      />{" "}
      Watch a video!
    </Link>
  );
}

export function ProfileJoinButton() {
  return (
    <Link
      href="/signup"
      className="border border-profilejoinbutton-border bg-profilejoinbutton p-[10.25px_23.15px] text-[24px] font-bold text-white hover:bg-profilejoinbutton-hover hover:no-underline"
    >
      Join today!
    </Link>
  );
}
