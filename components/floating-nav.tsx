"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  Calendar,
  Github,
  Linkedin,
  Mail,
  FileText,
} from "lucide-react";
import { SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { profileData } from "@/data/profile";

interface SocialLink {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
  openInNewTab?: boolean;
}

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const socialLinks: SocialLink[] = [
    ...(profileData.calLink
      ? [
          {
            icon: Calendar,
            href: profileData.calLink,
            label: "Book Call",
            openInNewTab: true,
          },
        ]
      : []),
    ...(profileData.resume
      ? [
          {
            icon: FileText,
            href: profileData.resume,
            label: "Resume",
            openInNewTab: true,
          },
        ]
      : []),
    ...profileData.socialLinks.map((link) => ({
      icon:
        link.icon === "github"
          ? Github
          : link.icon === "linkedin"
            ? Linkedin
            : link.icon === "twitter"
              ? SiX
            : Mail,
      href: link.url,
      label: link.platform,
      openInNewTab: link.url.startsWith("http"),
    })),
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-18 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-background/80 backdrop-blur-lg border border-slate-200/20 rounded-full px-6 py-3 shadow-lg shadow-slate-200/10">
        <div className="flex items-center gap-2">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <a
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-slate-200/10 hover:text-slate-600 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
