"use client";

import React, { useState } from "react";
import { knowledgeTopics } from "@/lib/knowledge-topics";
import { 
  ChevronRight, 
  BookOpen, 
  Search, 
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  Sparkles,
  Zap,
  Globe,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DocumentViewer() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const topic = knowledgeTopics.find(t => t.id === selectedTopic);
  
  const filteredTopics = knowledgeTopics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto w-full py-4 lg:py-8 h-full">
      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          <motion.div 
            key="topic-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 lg:space-y-12"
          >
            <div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-3xl lg:text-5xl font-black text-slate-900 mb-2 lg:mb-4 tracking-tighter">
                    Repository
                  </h1>
                  <p className="text-sm lg:text-xl text-slate-500 font-medium">
                    Search Agathos knowledge & protocols.
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
                  <motion.button 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedTopic(item.id)}
                    className="ag-card-premium text-left flex flex-col group p-6 lg:p-8 !rounded-[2rem]"
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brand-blue-soft text-brand-blue rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                      {item.icon === '🛡️' ? <ShieldCheck className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '🤝' ? <UserCheck className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '🌍' ? <Globe className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '💡' ? <Zap className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '💰' ? <CreditCard className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '🚀' ? <Sparkles className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '📑' ? <FileText className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       item.icon === '🔒' ? <Lock className="w-6 h-6 lg:w-7 lg:h-7" /> :
                       <BookOpen className="w-6 h-6 lg:w-7 lg:h-7" />}
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
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="topic-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 lg:space-y-8 pb-10 lg:pb-20"
          >
            <button 
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-xs lg:text-sm font-black text-slate-400 hover:text-brand-blue mb-2 transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
              Close Document
            </button>

            <article className="ag-card-premium !p-6 lg:!p-16 border-t-[6px] lg:border-t-8 border-t-brand-blue !rounded-[2.5rem]">
               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 lg:mb-12">
                  <div>
                    <h1 className="text-2xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-2 lg:mb-4">{topic?.title}</h1>
                    <p className="text-base lg:text-2xl text-slate-400 font-medium">{topic?.description}</p>
                  </div>
                  <div className="w-12 h-12 lg:w-24 lg:h-24 bg-brand-blue-soft text-brand-blue rounded-xl lg:rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10">
                    {topic?.icon === '🛡️' ? <ShieldCheck className="w-6 h-6 lg:w-12 lg:h-12" /> : <BookOpen className="w-6 h-6 lg:w-12 lg:h-12" />}
                  </div>
               </div>

               <div className="space-y-6 lg:space-y-8">
                  {topic?.content.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 lg:gap-6 items-start group"
                    >
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-2xl bg-slate-50 flex items-center justify-center text-brand-blue font-black text-[10px] lg:text-sm group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-sm lg:text-xl text-slate-600 leading-relaxed font-medium mt-1">
                        {point}
                      </p>
                    </motion.div>
                  ))}
               </div>
               
               <div className="mt-12 lg:mt-20 pt-8 lg:pt-10 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] lg:text-sm font-black text-slate-400 uppercase tracking-widest">Protocol Verified</span>
                  <button className="ag-btn-primary !text-[10px] lg:!text-sm !py-2 lg:!py-3 !px-4 lg:!px-8">
                    Contact RACHEL
                  </button>
               </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
