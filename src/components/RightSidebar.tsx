"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, RefreshCw, X, Loader2, Sparkles, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { postJson } from "@/lib/api-client";

export default function RightSidebar({ 
  pendingQuery, 
  onQueryHandled 
}: { 
  pendingQuery: string | null, 
  onQueryHandled: () => void 
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "👋 **Hello!** I'm the **Agathos AI Digital Receptionist**. \n\nHow can I help you with your **project onboarding** or **platform documentation** today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pendingQuery) {
      handleSend(pendingQuery);
      onQueryHandled();
    }
  }, [pendingQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (externalQuery?: string) => {
    const queryToSend = externalQuery || input;
    if (!queryToSend.trim() || isLoading) return;

    const userMessage = queryToSend;
    if (!externalQuery) setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const data = await postJson<{ content?: string }>('/api/chat', {
        messages: messages.concat({ role: 'user', content: userMessage }).map(m => ({
          role: m.role,
          content: m.content
        }))
      });

      if (data.content) {
        setMessages(prev => [...prev, { role: 'ai', content: data.content! }]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const detail = error instanceof Error ? error.message : String(error);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `Sorry, I'm having trouble connecting right now.\n\n**Debug:** \`${detail}\``
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="right-panel-container h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-xl">
            <Bot className="w-5 h-5 text-brand-blue" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">Agathos AI</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Online Assistance</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 bg-slate-50/10 min-h-0" style={{ scrollBehavior: 'smooth' }}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-end gap-2 max-w-[95%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-1.5 rounded-full shrink-0 ${m.role === 'user' ? 'bg-brand-blue text-white' : 'bg-white border border-slate-100 text-brand-blue'}`}>
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <div className={`chat-bubble-new ${m.role === 'user' ? 'chat-bubble-user-new' : 'chat-bubble-ai-new border-slate-100'}`}>
                  <article className="prose prose-sm prose-slate max-w-none text-inherit leading-relaxed">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </article>
                </div>
              </div>
              <span className="text-sm text-slate-400 mt-2 px-1 font-bold uppercase tracking-widest opacity-60">
                {m.role === 'ai' ? 'Assistant' : 'Member'} • Now
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="flex items-end gap-2">
              <div className="p-1.5 rounded-full bg-white border border-slate-100 text-brand-blue shadow-sm">
                <Bot className="w-3 h-3" />
              </div>
              <div className="chat-bubble-ai-new border-slate-100 shadow-sm p-4 rounded-3xl inline-flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100">
        <div className="relative group">
          <input 
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search Agathos documentation..."
            className="w-full py-4 px-6 pr-14 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-brand-blue transition-all shadow-sm placeholder:text-slate-400 font-medium text-sm group-hover:border-brand-blue/30"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 w-10 h-10 flex items-center justify-center bg-brand-blue text-white rounded-xl disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
