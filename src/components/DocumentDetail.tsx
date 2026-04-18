"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { knowledgeTopics } from "@/lib/knowledge-topics";
import CreateEventGuide from "@/components/CreateEventGuide";
import { useChatAssist } from "@/components/AppShell";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentDetail({ topicId }: { topicId: string }) {
  const topic = knowledgeTopics.find((t) => t.id === topicId);
  const { askAI } = useChatAssist();

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto w-full py-4 lg:py-8 h-full">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6 lg:space-y-8 pb-10 lg:pb-20"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs lg:text-sm font-black text-slate-400 hover:text-brand-blue mb-2 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
          Close Document
        </Link>

        {topic.id === "create-event-flow" ? (
          <CreateEventGuide onAskAI={askAI} />
        ) : (
          <article className="ag-card-premium !p-6 lg:!p-16 border-t-[6px] lg:border-t-8 border-t-brand-blue !rounded-[2.5rem]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 lg:mb-12">
              <div>
                <h1 className="text-2xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-2 lg:mb-4">
                  {topic.title}
                </h1>
                <p className="text-base lg:text-2xl text-slate-400 font-medium">
                  {topic.description}
                </p>
              </div>
              <div className="w-12 h-12 lg:w-24 lg:h-24 bg-brand-blue-soft text-brand-blue rounded-xl lg:rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10">
                {topic.icon === "🛡️" ? (
                  <ShieldCheck className="w-6 h-6 lg:w-12 lg:h-12" />
                ) : (
                  <BookOpen className="w-6 h-6 lg:w-12 lg:h-12" />
                )}
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {topic.content.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 lg:gap-6 items-start group"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-2xl bg-slate-50 flex items-center justify-center text-brand-blue font-black text-[10px] lg:text-sm group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm lg:text-xl text-slate-600 leading-relaxed font-medium mt-1">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 lg:mt-20 pt-8 lg:pt-10 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] lg:text-sm font-black text-slate-400 uppercase tracking-widest">
                Protocol Verified
              </span>
              <button className="ag-btn-primary !text-[10px] lg:!text-sm !py-2 lg:!py-3 !px-4 lg:!px-8">
                Contact RACHEL
              </button>
            </div>
          </article>
        )}
      </motion.div>
    </div>
  );
}
