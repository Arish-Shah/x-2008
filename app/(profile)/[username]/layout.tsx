import { Page } from "@/components/ui/page";
import { getTheme } from "@/lib/actions/profile/get-theme";
import { auth } from "@/lib/auth";

interface ProfileLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function ProfileLayout({
  params: { username },
  children,
}: ProfileLayoutProps) {
  const session = await auth();
  const join = !session?.user ? username : undefined;
  const theme = await getTheme(username);

  return (
    <Page theme={theme} join={join}>
      {children}
    </Page>
  );
}
