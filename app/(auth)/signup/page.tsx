import { SignupForm } from "@/components/forms/signup-form";
import { Content, Main, Sidebar } from "@/components/ui/content";
import { getRandomCaptcha } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twitter / Create an Account",
};

export default async function Signup() {
  const captcha = getRandomCaptcha();

  return (
    <Content>
      <Main>
        <Main.H2>Create a Free Twitter Account</Main.H2>
        <SignupForm captcha={captcha} />
        <div className="h-[20px]"></div>
      </Main>
      <Sidebar>
        <Sidebar.Section>
          <Sidebar.H1 className="!m-0 text-[14.04px]">
            Already a member? Please <Link href="/login">Sign In!</Link>
          </Sidebar.H1>
          <Sidebar.P className="!mt-0">
            Already use Twitter on your phone?{" "}
            <Link href="/account/complete">Head over here</Link> and we&rsquo;ll
            get you signed up on the web.
          </Sidebar.P>
        </Sidebar.Section>
      </Sidebar>
    </Content>
  );
}
