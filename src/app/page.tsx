"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Layout, Zap, Monitor, Download, Package, Settings2, CheckCircle2, Globe } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const templates = [
    {
      id: "demo1",
      name: "Demo 1",
      description: "A premium scroll-reveal template with smooth transitions and glassmorphism.",
      href: "/demo1",
      status: "Available",
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
    },
    {
      id: "coming-soon",
      name: "Dashboard Pro",
      description: "Enterprise-grade dashboard with advanced data visualization and modular components.",
      href: "#",
      status: "Coming Soon",
      icon: <Layout className="w-6 h-6 text-purple-400" />,
    },
    {
      id: "coming-soon-2",
      name: "SaaS Landing",
      description: "High-conversion landing page for modern SaaS products with dark/light modes.",
      href: "#",
      status: "Coming Soon",
      icon: <Zap className="w-6 h-6 text-pink-400" />,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 px-6 max-w-5xl w-full text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-slate-300">Premium Next.js Templates</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight">
          Crafting <span className="gradient-text">Future-Proof</span> Experiences
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          A curated collection of high-performance, aesthetically stunning Next.js templates for developers who demand excellence.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="#templates">
            <button className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-600/20">
              Browse Templates <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <a href="https://github.com/osamatech786/nextjs-templates" target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-4 rounded-xl glass border border-white/10 hover:bg-white/5 text-white font-bold transition-all flex items-center gap-2">
              <Monitor className="w-5 h-5" /> View Github
            </button>
          </a>
          <a href="https://www.linkedin.com/in/osamatech786" target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-4 rounded-xl glass border border-white/10 hover:bg-white/5 text-white font-bold transition-all flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-400" /> LinkedIn
            </button>
          </a>
        </div>
      </motion.section>

      {/* Templates Grid */}
      <motion.section
        id="templates"
        className="py-20 px-6 max-w-6xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">The Collection</h2>
            <p className="text-slate-400">Select a template to view the live demonstration.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              className={`group relative p-8 rounded-2xl glass border border-white/5 hover:border-indigo-500/30 transition-all duration-500 ${template.status === "Coming Soon" ? "opacity-75" : ""}`}
            >
              <div className="mb-6 p-3 rounded-xl bg-slate-800/50 w-fit group-hover:scale-110 transition-transform duration-500">
                {template.icon}
              </div>

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{template.name}</h3>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold ${template.status === "Available" ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400"}`}>
                  {template.status}
                </span>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed">
                {template.description}
              </p>

              {template.status === "Available" ? (
                <Link href={template.href} className="flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-3 transition-all">
                  View Demo <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-slate-500 font-bold italic cursor-not-allowed">
                  Under Construction
                </div>
              )}

              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 pointer-events-none transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How to Use Section */}
      <motion.section
        className="py-24 px-6 max-w-6xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How to Use</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Integration is seamless. Follow these steps to bring any template into your own Next.js project.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Pick & Copy",
              desc: "Choose a template and copy its directory from src/app/ into your project.",
              icon: <Download className="w-6 h-6 text-indigo-400" />,
            },
            {
              step: "02",
              title: "Install Deps",
              desc: "Run 'npm install framer-motion lucide-react' to ensure all animations work.",
              icon: <Package className="w-6 h-6 text-purple-400" />,
            },
            {
              step: "03",
              title: "Styles & Config",
              desc: "Copy the associated CSS files and update any font/color variables in your globals.",
              icon: <Settings2 className="w-6 h-6 text-pink-400" />,
            },
            {
              step: "04",
              title: "Go Live",
              desc: "Import the component, update your routes, and you're ready to deploy!",
              icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 rounded-2xl glass border border-white/5 flex flex-col items-center text-center group hover:bg-white/5 transition-all duration-500"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-500 z-20 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                {item.step}
              </div>
              <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-3xl border border-dashed border-white/10 bg-indigo-500/5 text-center"
          variants={itemVariants}
        >
          <p className="text-slate-300 italic">
            "Designed for modularity. Every template is self-contained for maximum portability."
          </p>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-auto py-12 text-center text-slate-500 border-t border-white/5 w-full bg-black/20 backdrop-blur-sm">
        <p className="text-sm">© {new Date().getFullYear()} Next.js Templates. Built with ❤️ for the community.</p>
      </footer>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .gradient-text {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
