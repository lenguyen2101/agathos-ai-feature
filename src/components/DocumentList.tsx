"use client";

import React, { useState } from "react";
import Link from "next/link";
import { knowledgeTopics } from "@/lib/knowledge-topics";
import {
  BookOpen,
  Search,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  Zap,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = knowledgeTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto w-full py-4 lg:py-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 lg:space-y-12"
      >
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl lg:text-5xl font-black text-slate-900 mb-2 lg:mb-4 tracking-tighter">
                Repository
              </h1>
              <p className="text-sm lg:text-xl text-slate-500 font-medium">
                Search Agathos knowledge &amp; protocols.
              </p>
            </div>
            <div className="relative w-full lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all shadow-sm font-medium text-sm lg:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {filteredTopics.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/docs/${item.id}`}
                  className="ag-card-premium text-left flex flex-col group p-6 lg:p-8 !rounded-[2rem]"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brand-blue-soft text-brand-blue rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                    {item.icon === "🛡️" ? (
                      <ShieldCheck className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "🤝" ? (
                      <UserCheck className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "🌍" ? (
                      <Globe className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "💡" ? (
                      <Zap className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "💰" ? (
                      <CreditCard className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "🚀" ? (
                      <Sparkles className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "📑" ? (
                      <FileText className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "🎟️" ? (
                      <Sparkles className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : item.icon === "🔒" ? (
                      <Lock className="w-6 h-6 lg:w-7 lg:h-7" />
                    ) : (
                      <BookOpen className="w-6 h-6 lg:w-7 lg:h-7" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-2xl font-black text-slate-900 mb-2 lg:mb-3 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 hidden lg:block" />
                    </h3>
                    <p className="text-xs lg:text-slate-500 line-clamp-3 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
