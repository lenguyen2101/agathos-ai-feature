"use client";

import React from "react";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  FileText,
  User,
  LogOut,
  ChevronRight,
  DollarSign,
  Users,
  Calendar
} from "lucide-react";

export default function LeftSidebar({ 
  activeTab, 
  setActiveTab, 
  onStartOnboarding,
  onAskAI
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  onStartOnboarding: () => void,
  onAskAI: (query: string) => void
}) {
  const commonQuestions = [
    { text: "What is the TrustMark?", icon: <ShieldCheck className="w-4 h-4" /> },
    { text: "How do I start a project?", icon: <Sparkles className="w-4 h-4" /> },
    { text: "How to create an event?", icon: <Calendar className="w-4 h-4" /> },
    { text: "Required documents?", icon: <FileText className="w-4 h-4" /> },
    { text: "Love Gift Model", icon: <CreditCard className="w-4 h-4" /> },
    { text: "What are the platform fees?", icon: <DollarSign className="w-4 h-4" /> },
    { text: "Is Agathos a charity?", icon: <HelpCircle className="w-4 h-4" /> },
    { text: "How to manage roles?", icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <aside className="left-panel-container h-full p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white font-black text-xl">
          A
        </div>
        <div>
          <h1 className="text-xl font-heading font-black text-slate-900 leading-none">agathos</h1>
          <p className="text-xs tracking-[0.2em] font-bold text-slate-400 uppercase mt-1">Digital Receptionist</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <button 
          onClick={onStartOnboarding}
          className="ag-btn-primary w-full justify-center py-4 mb-8"
        >
          <Sparkles className="w-5 h-5 fill-white/20" />
          Smart Onboarding
        </button>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-3">Menu</p>
        
        <button 
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-bold ${
            activeTab === 'docs' 
              ? 'bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 group'
          }`}
        >
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'docs' ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
            <BookOpen className="w-4 h-4" />
          </div>
          Knowledge Base
        </button>

        <div className="my-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Common Questions</p>
          <div className="flex flex-col gap-1">
            {commonQuestions.map((q) => (
              <button 
                key={q.text}
                onClick={() => onAskAI(q.text)}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-brand-blue/10 text-slate-400 group-hover:text-brand-blue">
                  {q.icon}
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-brand-blue">{q.text}</span>
                <ChevronRight className="w-3 h-3 ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
