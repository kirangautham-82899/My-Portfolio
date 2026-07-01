"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  Moon,
  Network,
  Phone,
  Radar,
  Send,
  ShieldCheck,
  Sparkle,
  Sun,
  Terminal,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { type CSSProperties, type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { ScrambleText } from "@/components/scramble-text";
import type { PortfolioData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("@/components/hero-canvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(142,230,255,.18),transparent_42%)]" />,
});

const icons: Record<string, LucideIcon> = {
  Award,
  BadgeCheck,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  Network,
  Phone,
  Radar,
  ShieldCheck,
  Sparkles: Sparkle,
  Terminal,
  Trophy,
  Users,
  Zap,
};

function IconGlyph({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkle;
  return <Icon className={className} aria-hidden />;
}

function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28", className)}>
      <div className="reveal mb-10 max-w-3xl">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--primary)]">
          <Sparkle className="h-4 w-4" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -9;
    const ry = ((x / rect.width) - 0.5) * 9;
    ref.current?.style.setProperty("--rx", `${rx}deg`);
    ref.current?.style.setProperty("--ry", `${ry}deg`);
    ref.current?.style.setProperty("--mx", `${x}px`);
    ref.current?.style.setProperty("--my", `${y}px`);
  };

  const reset = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        "spotlight glass group relative overflow-hidden rounded-[var(--radius)] transition duration-300 [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-[var(--line-strong)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = !mounted || resolvedTheme === "dark";

  return (
    <Button
      aria-label="Toggle color theme"
      variant="secondary"
      size="icon"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="rounded-full"
    >
      {dark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </Button>
  );
}

function Nav({ resume }: { resume: string }) {
  const links = ["About", "Skills", "Projects", "Research", "Contact"];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 right-0 top-4 z-50 mx-auto flex w-[min(94vw,1120px)] items-center justify-between rounded-full border border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_78%,transparent)] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl"
    >
      <a href="#home" className="flex items-center gap-3" aria-label="Kiran Gautham home">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--foreground)] text-sm font-black text-[var(--background)]">
          KG
        </span>
        <span className="hidden text-sm font-semibold sm:block">Kiran Gautham</span>
      </a>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="rounded-full px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] hover:text-[var(--foreground)]"
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button asChild variant="neon" size="sm" className="rounded-full">
          <a href={resume} download>
            <Download className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </Button>
      </div>
    </motion.header>
  );
}

function Hero({ data }: { data: PortfolioData }) {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setShowCanvas(true), { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = globalThis.setTimeout(() => setShowCanvas(true), 600);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
      <div className="grid-bg absolute inset-0 opacity-55" aria-hidden />
      <div className="absolute inset-0 z-0 opacity-90" aria-hidden>
        {showCanvas ? (
          <HeroCanvas />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(142,230,255,.18),transparent_42%)]" />
        )}
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block">Kiran Gautham </span>
            <span className="glow-text block pt-2 text-4xl sm:text-6xl lg:text-7xl">
              <ScrambleText text="builds intelligent systems." />
            </span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">{data.person.summary}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" variant="default" size="lg">
              View case studies <ArrowUpRight className="h-4 w-4" aria-hidden />
            </MagneticButton>
            <MagneticButton href={`mailto:${data.person.email}`} variant="secondary" size="lg">
              <Mail className="h-4 w-4" aria-hidden /> Start a conversation
            </MagneticButton>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {data.heroStats.map((stat) => (
              <div key={stat.label} className="glass rounded-[var(--radius)] px-4 py-4">
                <p className="text-2xl font-semibold text-[var(--foreground)]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
          className="relative hidden min-h-[560px] lg:block"
          aria-hidden
        >
          <div className="absolute left-8 top-10 h-24 w-72 rounded-full bg-[color-mix(in_oklab,var(--primary)_24%,transparent)] blur-3xl" />
          <div className="absolute bottom-24 right-10 h-28 w-72 rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] blur-3xl" />
          <TiltCard className="absolute right-6 top-12 w-80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Engineering signal</p>
            <p className="mt-4 text-3xl font-semibold">Full stack + AI + security</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ delay: 0.8, duration: 1.3 }} />
            </div>
          </TiltCard>
          <TiltCard className="absolute bottom-14 left-0 w-96 p-5">
            <p className="text-sm text-[var(--muted)]">Current trajectory</p>
            <p className="mt-2 text-xl font-semibold">Production internship, research publication, and multi-domain project portfolio.</p>
          </TiltCard>
        </motion.div>
      </div>
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[var(--line)] p-3 text-[var(--muted)]">
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}

function About({ data }: { data: PortfolioData }) {
  return (
    <Section id="about" eyebrow="About" title="A product-minded engineer with research depth and security instincts.">
      <div className="grid gap-4 lg:grid-cols-4">
        {data.focusAreas.map((area) => (
          <TiltCard key={area.title} className="reveal p-6">
            <IconGlyph name={area.icon} className="h-8 w-8 text-[var(--primary)]" />
            <h3 className="mt-5 text-xl font-semibold">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{area.text}</p>
          </TiltCard>
        ))}
      </div>
      <div className="reveal mt-5 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="glass rounded-[var(--radius)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--primary)]">Education</p>
          <h3 className="mt-3 text-2xl font-semibold">{data.education.degree}</h3>
          <p className="mt-2 text-[var(--muted)]">{data.education.school}</p>
          <p className="mt-4 font-semibold text-[var(--accent)]">{data.education.score}</p>
        </div>
        <div className="glass rounded-[var(--radius)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--primary)]">Professional summary</p>
          <p className="mt-3 text-lg leading-8 text-[var(--muted)]">{data.person.summary}</p>
        </div>
      </div>
    </Section>
  );
}

function Skills({ data }: { data: PortfolioData }) {
  return (
    <Section id="skills" eyebrow="Skills" title="A modern stack for ambitious web, AI, and real-time products.">
      <div className="grid gap-4 lg:grid-cols-2">
        {data.skills.map((skill, index) => (
          <div key={skill.name} className="reveal glass rounded-[var(--radius)] p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{skill.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{skill.group}</p>
              </div>
              <span className="text-sm text-[var(--primary)]">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.04, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Experience({ data }: { data: PortfolioData }) {
  return (
    <Section id="experience" eyebrow="Experience" title="Built around shipping, testing, and production collaboration.">
      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-transparent md:block" aria-hidden />
        {data.experience.map((item) => (
          <div key={item.role} className="reveal relative mb-6 md:pl-14">
            <div className="absolute left-0 top-6 hidden h-8 w-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--background)] text-[var(--primary)] md:grid">
              <IconGlyph name={item.icon} className="h-4 w-4" />
            </div>
            <TiltCard className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-[var(--primary)]">{item.company} - {item.location}</p>
                </div>
                <span className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">{item.period}</span>
              </div>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[var(--muted)]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects({ data }: { data: PortfolioData }) {
  return (
    <Section id="projects" eyebrow="Featured Projects" title="Animated case studies across AI, security, computer vision, and live systems.">
      <div className="grid gap-5 lg:grid-cols-2">
        {data.projects.map((project, index) => (
          <TiltCard key={project.title} className={cn("reveal p-0", index === 0 && "lg:col-span-2")}>
            <div className={cn("grid gap-0", index === 0 && "lg:grid-cols-[1.05fr_0.95fr]")}>
              <div className="relative min-h-72 overflow-hidden">
                <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 1024px) 50vw, 100vw" priority={index === 0} className="object-cover transition duration-700 group-hover:scale-105" />
                <div className={cn("absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t opacity-80", project.accent)} />
              </div>
              <div className="p-6 sm:p-7">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{project.period}</span>
                  <div className="flex gap-2">
                    <Button asChild variant="secondary" size="icon" aria-label={`${project.title} GitHub`}>
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" aria-hidden />
                      </a>
                    </Button>
                    <Button asChild variant="secondary" size="icon" aria-label={`${project.title} live demo`}>
                      <a href={project.live}>
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-[var(--primary)]">{project.subtitle}</p>
                <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">{project.impact}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-[var(--line)] bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] px-3 py-1 text-xs text-[var(--muted)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}

function ResearchAndAchievements({ data }: { data: PortfolioData }) {
  return (
    <Section id="research" eyebrow="Research & Proof" title="Publication, awards, certifications, and leadership signal.">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <TiltCard className="reveal p-6">
          <IconGlyph name={data.publication.icon} className="h-9 w-9 text-[var(--primary)]" />
          <p className="mt-5 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Research publication</p>
          <h3 className="mt-3 text-2xl font-semibold">{data.publication.title}</h3>
          <p className="mt-3 text-[var(--muted)]">{data.publication.venue}</p>
          <Button asChild variant="neon" className="mt-6">
            <a href={data.publication.doi} target="_blank" rel="noreferrer">
              Read DOI <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
        </TiltCard>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.achievements.map((item) => (
            <TiltCard key={`${item.title}-${item.text}`} className="reveal p-5">
              <IconGlyph name={item.icon} className="h-7 w-7 text-[var(--accent)]" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
            </TiltCard>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="reveal glass rounded-[var(--radius)] p-6">
          <h3 className="text-xl font-semibold">Certifications</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {data.certifications.map((cert) => (
              <span key={cert} className="rounded-full border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]">
                {cert}
              </span>
            ))}
          </div>
        </div>
        <div className="reveal glass rounded-[var(--radius)] p-6">
          <h3 className="text-xl font-semibold">Leadership</h3>
          <div className="mt-5 space-y-4">
            {data.leadership.map((item) => (
              <div key={item.title} className="flex gap-4">
                <IconGlyph name={item.icon} className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-[var(--primary)]">{item.org}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function TechStack({ data }: { data: PortfolioData }) {
  return (
    <Section id="tech-stack" eyebrow="Tech Stack" title="A broad toolkit, composed for speed and maintainability.">
      <div className="reveal flex flex-wrap gap-3">
        {data.techStack.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.018 }}
            className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--muted)] backdrop-blur-xl hover:border-[var(--primary)] hover:text-[var(--foreground)]"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}

function GithubActivity({ data }: { data: PortfolioData }) {
  const cells = useMemo(() => Array.from({ length: 161 }, (_, i) => (i * 17 + i * i) % 5), []);
  const totals = [
    { label: "Primary language", value: "TypeScript" },
    { label: "Systems focus", value: "Realtime + AI" },
    { label: "Profile", value: data.person.githubHandle },
  ];

  return (
    <Section id="github" eyebrow="GitHub Activity" title="A coding signal board for experiments, systems, and shipping.">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal glass rounded-[var(--radius)] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">Contribution graph</h3>
            <Button asChild variant="secondary" size="sm">
              <a href={data.person.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" aria-hidden /> GitHub
              </a>
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(23,minmax(0,1fr))] gap-1 overflow-hidden" aria-label="Stylized GitHub contribution graph">
            {cells.map((level, index) => (
              <span
                key={index}
                className="aspect-square rounded-[3px]"
                style={
                  {
                    background:
                      level === 0
                        ? "color-mix(in oklab, var(--foreground) 8%, transparent)"
                        : `color-mix(in oklab, var(--accent) ${18 + level * 16}%, transparent)`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {totals.map((stat) => (
            <TiltCard key={stat.label} className="reveal p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact({ data }: { data: PortfolioData }) {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4200);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Bring Kiran into the room where ambitious systems are built.">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal glass rounded-[var(--radius)] p-6">
          <h3 className="text-2xl font-semibold">Let’s build something sharp.</h3>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Open to full-stack, AI/ML, cybersecurity, and real-time engineering opportunities with teams that care about craft and impact.
          </p>
          <div className="mt-7 grid gap-3">
            {data.contactLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--line)] px-4 py-3 text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--foreground)]">
                <IconGlyph name={link.icon} className="h-4 w-4 text-[var(--primary)]" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="reveal glass rounded-[var(--radius)] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-[var(--muted)]">
              Name
              <input required name="name" className="rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_72%,transparent)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" />
            </label>
            <label className="grid gap-2 text-sm text-[var(--muted)]">
              Email
              <input required type="email" name="email" className="rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_72%,transparent)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" />
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
            Message
            <textarea required name="message" rows={6} className="resize-none rounded-[var(--radius)] border border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_72%,transparent)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" />
          </label>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button type="submit" variant="default">
              <Send className="h-4 w-4" aria-hidden /> Send message
            </Button>
            {sent && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-[var(--accent)]">
                <CheckCircle2 className="h-4 w-4" aria-hidden /> Message staged. Email link is ready for delivery.
              </motion.p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}

function Footer({ data }: { data: PortfolioData }) {
  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-10 text-sm text-[var(--muted)] sm:px-8 md:flex-row md:items-center md:justify-between">
      <p>&copy; 2026 Kiran Gautham. All rights reserved.</p>
      <div className="flex gap-3">
        <a href={data.person.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-[var(--line)] p-3 transition hover:border-[var(--primary)] hover:text-[var(--foreground)]">
          <Github className="h-4 w-4" aria-hidden />
        </a>
        <a href={data.person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-[var(--line)] p-3 transition hover:border-[var(--primary)] hover:text-[var(--foreground)]">
          <Linkedin className="h-4 w-4" aria-hidden />
        </a>
        <a href={`mailto:${data.person.email}`} aria-label="Email" className="rounded-full border border-[var(--line)] p-3 transition hover:border-[var(--primary)] hover:text-[var(--foreground)]">
          <Mail className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}

export function PortfolioExperience({ data }: { data: PortfolioData }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    const loadAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const items = gsap.utils.toArray<HTMLElement>(".reveal");
      const animations = items.map((item) =>
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
          },
        }),
      );

      cleanup = () => {
        animations.forEach((animation) => animation.kill());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    loadAnimations();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduceMotion]);

  return (
    <main className="relative overflow-hidden">
      <div className="noise" aria-hidden />
      <Nav resume={data.person.resume} />
      <Hero data={data} />
      <About data={data} />
      <Skills data={data} />
      <Experience data={data} />
      <Projects data={data} />
      <ResearchAndAchievements data={data} />
      <TechStack data={data} />
      <GithubActivity data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </main>
  );
}
