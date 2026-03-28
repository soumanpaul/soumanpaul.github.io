"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionContainer from "@/components/section-container";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { profileData, siteConfig } from "@/data";

const linkedInUrl =
  profileData.socialLinks.find((link) => link.icon === "linkedin")?.url ||
  "https://linkedin.com/in/souman";
const githubUrl =
  profileData.socialLinks.find((link) => link.icon === "github")?.url ||
  "https://github.com/soumanpaul";

const contactLinks = [
  ...(profileData.calLink
    ? [
        {
          icon: Calendar,
          label: "Schedule a call",
          description: "Book a 30-min chat",
          url: profileData.calLink,
          isLucide: true,
        },
      ]
    : []),
  {
    icon: Mail,
    label: profileData.email,
    description: "Drop me an email",
    url: `mailto:${profileData.email}`,
    isLucide: true,
  },
  {
    icon: SiLinkedin,
    label: "Connect on LinkedIn",
    description: "Let's network",
    url: linkedInUrl,
    isLucide: false,
  },
  {
    icon: SiGithub,
    label: "GitHub Profile",
    description: "See more code",
    url: githubUrl,
    isLucide: false,
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <SectionContainer id="contact">
      <SectionHeader
        label="Contact"
        title="Get in Touch"
        description="Have a project in mind or just want to chat? I'd love to hear from you."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column — Contact Links */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            Open for senior engineering roles, platform work, product
            collaboration, and AI system discussions. If you want to talk
            through a team, product, or architecture problem, feel free to
            reach out.
          </p>

          <div className="space-y-3">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <Icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {link.label}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {link.description}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-xl bg-card border border-border/40 p-5">
            {siteConfig.features.contactForm ? (
              <>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <MessageSquare className="w-4 h-4 text-primary/70" />
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="sm"
                    disabled={status === "sending"}
                    className="w-full rounded-lg font-semibold gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Message Sent!
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5" />
                        Failed — Try Again
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <MessageSquare className="w-4 h-4 text-primary/70" />
                  Best way to reach me
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This site is deployed as a static GitHub Pages build, so the
                  contact form is intentionally replaced with direct links. Email
                  works best for project discussions, hiring, and architecture
                  conversations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="rounded-lg font-semibold">
                    <a href={`mailto:${profileData.email}`}>
                      <Mail className="w-4 h-4" />
                      Email Me
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg font-semibold">
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                      <SiLinkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
                {profileData.resume && (
                  <Button asChild variant="ghost" className="px-0 justify-start">
                    <a href={profileData.resume} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
