"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkSpaceSidebar } from "./workspace-sidebar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceIdLayout({ children }: WorkspaceIdLayoutProps) {
  return (
    <div className="h-full">
      <Toolbar />

      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />

        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="ca-workspace-layout"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <WorkSpaceSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
