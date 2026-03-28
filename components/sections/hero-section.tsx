"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import SectionContainer from "@/components/section-container";
import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  Mail,
  FileText,
  Phone,
} from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { profileData } from "@/data/profile";

const stats = [
  { icon: MapPin, label: profileData.location },
  { icon: Briefcase, label: profileData.yearsOfExperience || "6+ years" },
  { icon: Clock, label: profileData.availability || "Open to work" },
];

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: SiLinkedin,
  twitter: SiX,
  mail: Mail,
};

const badgeColors = [
  "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
];

export default function HeroSection() {
  const [animateImage, setAnimateImage] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  return (
    <SectionContainer className="pt-24 pb-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <motion.div
            variants={itemVariants}
            onClick={() => setAnimateImage(!animateImage)}
            className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 cursor-pointer"
          >
            <motion.div
              className="absolute -inset-1.5 bg-primary/10 rounded-full blur-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              animate={
                animateImage ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }
              }
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 bg-background shadow-xl"
            >
              <Image
                src={profileData.avatar || "/profile.png"}
                alt={profileData.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          <div className="space-y-2 flex-1">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 flex-wrap"
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {profileData.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-500/15 text-green-400 border border-green-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-muted-foreground font-medium">
                <Typewriter
                  words={profileData.heroRoles || [profileData.tagline]}
                  loop={true}
                  cursor
                  cursorColor="currentColor"
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground/70" />
                <span>{stat.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {profileData.socialLinks.map((social) => {
            const Icon = socialIconMap[social.icon];
            if (!Icon) {
              return null;
            }
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.platform}
                className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center hover:bg-muted/80 hover:border-primary/30 transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            );
          })}
        </motion.div>

        {/* Bio */}
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            {profileData.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {(profileData.focusAreas || []).map((label, index) => (
              <span
                key={label}
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                  badgeColors[index % badgeColors.length]
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 pt-1"
        >
          <a
            href={profileData.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              variant="default"
              className="rounded-full px-5 font-semibold gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </Button>
          </a>
          {profileData.calLink && (
            <a
              href={profileData.calLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="outline"
                className="rounded-full px-5 font-semibold border-border/50 gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Call
              </Button>
            </a>
          )}
          <Link href="#contact">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-5 font-semibold border-border/50 gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
