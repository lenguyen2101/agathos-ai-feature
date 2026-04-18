"use client";

import React, { useState } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import DocumentViewer from "@/components/DocumentViewer";
import OnboardingFlow from "@/components/OnboardingFlow";
import { MessageSquare, Menu, X, Bot, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'docs' | 'onboarding'>('docs');
  const [pendingChatQuery, setPendingChatQuery] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartOnboarding = () => {
    setActiveTab('onboarding');
    setIsMobileMenuOpen(false);
  };

  const handleOnboardingComplete = (data: Record<string, string | string[]>) => {
    console.log("Onboarding Complete:", data);
  };

  return (
    <main className="app-layout">
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6">
        <div className="font-heading font-black text-xl text-brand-blue flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white text-sm shadow-md">A</div>
            agathos
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
                <Bot className="w-5 h-5 text-brand-blue" />
            </button>
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </header>

      {/* LEFT PANEL - Desktop Desktop */}
      <LeftSidebar 
        activeTab={activeTab === 'onboarding' ? '' : activeTab} 
        setActiveTab={(tab) => {
        setActiveTab(tab as "docs" | "onboarding");
            setIsMobileMenuOpen(false);
        }}
        onStartOnboarding={handleStartOnboarding}
        onAskAI={(query) => {
            setPendingChatQuery(query);
            setIsChatOpen(true);
            setIsMobileMenuOpen(false);
        }}
      />

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 lg:hidden bg-white pt-20"
          >
             <LeftSidebar 
                activeTab={activeTab === 'onboarding' ? '' : activeTab} 
                setActiveTab={(tab) => {
                    setActiveTab(tab as "docs" | "onboarding");
                    setIsMobileMenuOpen(false);
                }}
                onStartOnboarding={handleStartOnboarding}
                onAskAI={(query) => {
                    setPendingChatQuery(query);
                    setIsChatOpen(true);
                    setIsMobileMenuOpen(false);
                }}
              />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER PANEL */}
      <section className="center-panel-container pt-20 lg:pt-0">
        <div className="container-soft py-12">
            {activeTab === 'docs' && (
              <DocumentViewer
                onAskAI={(query) => {
                  setPendingChatQuery(query);
                  setIsChatOpen(true);
                }}
              />
            )}
            {activeTab === 'onboarding' && <OnboardingFlow onComplete={handleOnboardingComplete} />}
        </div>
      </section>

      {/* RIGHT PANEL - Desktop */}
      <RightSidebar pendingQuery={pendingChatQuery} onQueryHandled={() => setPendingChatQuery(null)} />

      {/* MOBILE CHAT OVERLAY */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] lg:hidden bg-white pt-16 flex flex-col"
          >
             <header className="px-6 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-brand-blue" />
                    <span className="font-heading font-black text-lg">Agathos AI</span>
                </div>
                <button 
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-xl"
                >
                    <X className="w-6 h-6 text-slate-400" />
                </button>
             </header>
             <div className="flex-1 flex flex-col overflow-hidden">
                <RightSidebar pendingQuery={pendingChatQuery} onQueryHandled={() => setPendingChatQuery(null)} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FAB - Chat */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-16 h-16 bg-brand-blue text-white rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center z-30 transform hover:scale-110 active:scale-95 transition-all"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </main>
  );
}
