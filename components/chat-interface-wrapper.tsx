"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/data";

const ChatInterface = dynamic(() => import("@/components/chat-interface"), {
  ssr: false
});

export default function ChatInterfaceWrapper() {
  if (!siteConfig.features.aiChat) {
    return null;
  }

  return <ChatInterface />;
}
