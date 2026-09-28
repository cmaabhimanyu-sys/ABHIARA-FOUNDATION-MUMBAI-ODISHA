import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { ExternalLink, LogOut, PanelLeft } from "lucide-react";
import { type ComponentType, type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

export type DashboardMenuItem = {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type DashboardLayoutProps = {
  children: ReactNode;
  menuItems: DashboardMenuItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  title?: string;
};

const SIDEBAR_WIDTH_KEY = "abhiara-admin-sidebar-width";
const DEFAULT_WIDTH = 272;
const MIN_WIDTH = 220;
const MAX_WIDTH = 360;

export default function DashboardLayout({
  children,
  menuItems,
  activeKey,
  onSelect,
  title = "Owner Control Centre",
}: DashboardLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_WIDTH;
    const saved = window.localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? Number.parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user, logout } = useAuth();

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth));
  }, [sidebarWidth]);

  if (loading) return <DashboardLayoutSkeleton />;

  if (!user) {
    const startLogin = () => {
      const target = getLoginUrl("/admin");
      if (target && target !== "#") window.location.href = target;
    };
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#E8DCC6] bg-white p-8 text-center shadow-sm">
          <img src="/abhiara-logo.png" alt="Abhiara Foundation" className="mx-auto h-16 w-auto" />
          <h1 className="mt-6 font-serif text-3xl font-bold text-[#1A1A1A]">Owner sign in</h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[#666]">
            Sign in with the Foundation owner account to manage reports, approved photos, public details and donation records.
          </p>
          <Button onClick={startLogin} size="lg" className="mt-7 w-full bg-[#F5A623] font-bold text-[#1A1A1A] hover:bg-[#E8960E]">
            Continue to secure sign in
          </Button>
          <a href="/" className="mt-5 inline-flex text-sm font-bold text-[#9A6100] hover:underline">Back to website</a>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
      <DashboardLayoutContent
        title={title}
        menuItems={menuItems}
        activeKey={activeKey}
        onSelect={onSelect}
        onLogout={() => void logout()}
        setSidebarWidth={setSidebarWidth}
        userName={user.name || "Owner"}
        userEmail={user.email || ""}
      >
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

type DashboardLayoutContentProps = DashboardLayoutProps & {
  onLogout: () => void;
  setSidebarWidth: (width: number) => void;
  userName: string;
  userEmail: string;
};

function DashboardLayoutContent({
  children,
  menuItems,
  activeKey,
  onSelect,
  onLogout,
  setSidebarWidth,
  title = "Owner Control Centre",
  userName,
  userEmail,
}: DashboardLayoutContentProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isMobile = useIsMobile();
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeItem = menuItems.find(item => item.key === activeKey);

  useEffect(() => {
    if (isCollapsed) setIsResizing(false);
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing) return;
      const left = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const width = event.clientX - left;
      if (width >= MIN_WIDTH && width <= MAX_WIDTH) setSidebarWidth(width);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar collapsible="icon" className="border-r border-[#E8DCC6] bg-[#17130D] text-white" disableTransition={isResizing}>
          <SidebarHeader className="border-b border-white/10 px-3 py-4">
            <div className="flex items-center gap-3">
              <button onClick={toggleSidebar} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/70 hover:bg-white/10" aria-label="Toggle menu">
                <PanelLeft className="h-4 w-4" />
              </button>
              {!isCollapsed && <div><p className="font-serif text-base font-bold text-white">Abhiara Foundation</p><p className="text-[10px] uppercase tracking-wider text-[#F5A623]">Owner controls</p></div>}
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-3">
            <SidebarMenu>
              {menuItems.map(item => {
                const active = item.key === activeKey;
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={active}
                      onClick={() => onSelect(item.key)}
                      tooltip={item.label}
                      className={`h-11 rounded-lg ${active ? "bg-[#F5A623] font-bold text-[#1A1A1A] hover:bg-[#F5A623]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-white/10 p-3">
            {!isCollapsed && <div className="mb-3 flex items-center gap-3 px-2"><Avatar className="h-9 w-9 border border-white/20"><AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-sm font-bold text-white">{userName}</p><p className="truncate text-[10px] text-white/50">{userEmail}</p></div></div>}
            <a href="https://www.abhiarafoundation.org/" target="_blank" rel="noreferrer" className="mb-1 flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"><ExternalLink className="h-4 w-4 shrink-0" />{!isCollapsed && <span>Open website</span>}</a>
            <button type="button" onClick={onLogout} className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4 shrink-0" />{!isCollapsed && <span>Sign out</span>}</button>
          </SidebarFooter>
        </Sidebar>
        <div className={`absolute right-0 top-0 z-50 h-full w-1 cursor-col-resize hover:bg-[#F5A623]/30 ${isCollapsed ? "hidden" : ""}`} onMouseDown={() => setIsResizing(true)} />
      </div>

      <SidebarInset className="bg-[#FAF8F3]">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#E8DCC6] bg-white/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            {isMobile && <SidebarTrigger className="h-9 w-9" />}
            <div><p className="font-serif text-lg font-bold text-[#1A1A1A]">{activeItem?.label || title}</p><p className="hidden text-xs text-[#777] sm:block">Manage the website without editing code</p></div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Secure admin</span>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </>
  );
}
