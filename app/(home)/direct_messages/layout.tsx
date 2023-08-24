import { DeviceUpdates } from "@/components/home/device-updates";
import { Menu } from "@/components/home/menu";
import { Following } from "@/components/profile/following";
import { MastHead } from "@/components/profile/mast-head";
import { Stats } from "@/components/profile/stats";
import { Content, Main, Sidebar } from "@/components/ui/content";
import { getDeviceUpdates } from "@/lib/actions/settings/get-post-delete-device";
import { auth } from "@/lib/auth";

interface DirectMessagesLayoutProps {
  children: React.ReactNode;
}

export default async function DirectMessagesLayout({
  children,
}: DirectMessagesLayoutProps) {
  const { user } = await auth();

  const device = await getDeviceUpdates();

  return (
    <Content>
      <Main className="px-[20px] py-[8px]">{children}</Main>
      <Sidebar>
        <Sidebar.Section>
          <MastHead username={user.username} size="small" light />
          <div className="h-[10px]"></div>
          <Stats username={user.username} />
        </Sidebar.Section>
        <Menu type="home" selected="Direct Messages" />
        <Sidebar.Section bordered>
          <Following username={user.username} />
        </Sidebar.Section>
        <Sidebar.Section bordered>
          <DeviceUpdates device={device} />
        </Sidebar.Section>
      </Sidebar>
    </Content>
  );
}