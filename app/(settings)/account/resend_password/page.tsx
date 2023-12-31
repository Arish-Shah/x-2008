import { ResendPasswordForm } from "@/components/forms/resend-password-form";
import { Main } from "@/components/ui/content";

export default async function ResendPassword() {
  return (
    <Main>
      <Main.H2>Forgot?</Main.H2>
      <Main.P>
        Put in your email address below and we&apos;ll reset it for you.
      </Main.P>
      <ResendPasswordForm />
      <div className="h-[20px]"></div>
    </Main>
  );
}
