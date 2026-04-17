"use client";

import React, { useState, useMemo } from "react";
import { onboardingQuestions, Question } from "@/lib/onboarding-questions";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Building2,
  User,
  PartyPopper,
  X,
  Zap,
  Upload,
  FileText,
  Bot,
  Sparkles,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingFlow({ onComplete }: { onComplete: (data: Record<string, string | string[]>) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Auto-scroll to top when step changes
  React.useEffect(() => {
    const scrollContainer = document.querySelector('.center-panel-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, isFinished]);

  // AI Summary Generation when finished
  React.useEffect(() => {
     if (isFinished && !summary && !isSummarizing) {
       const generateSummary = async () => {
         setIsSummarizing(true);
         try {
           const controller = new AbortController();
           const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

           const res = await fetch('/api/ai/onboarding', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ action: 'summarize', context: answers }),
             signal: controller.signal
           });
           
           clearTimeout(timeoutId);
           
           if (!res.ok) throw new Error(`Server responded with ${res.status}`);
           const data = await res.json();
           if (data.suggestion) {
             setSummary(data.suggestion);
           } else {
             throw new Error(data.error || "No summary returned");
           }
         } catch (e) {
           console.error("Summary Generation Error:", e);
           // Fallback summary if AI fails
           const projectTitle = (answers['project-title'] as string) || "your project";
           setSummary(`We have received your application for "${projectTitle}". Our team will review the details and get back to you soon.`);
         } finally {
           setIsSummarizing(false);
         }
       };
       generateSummary();
     }
  }, [isFinished, answers, summary, isSummarizing]);

  // Helper to determine if a question should be visible
  const isQuestionVisible = (q: Question, currentAnswers: Record<string, string | string[]>) => {
    if (!q.dependsOn) return true;
    return currentAnswers[q.dependsOn.questionId] === q.dependsOn.value;
  };

  // Group active questions by groupId
  const visibleGroups = useMemo(() => {
    const activeQuestions = onboardingQuestions.filter(q => isQuestionVisible(q, answers));
    
    const groups: { id: string, section: string, questions: Question[] }[] = [];
    const groupMap: Record<string, number> = {};

    activeQuestions.forEach(q => {
      if (groupMap[q.groupId] === undefined) {
        groupMap[q.groupId] = groups.length;
        groups.push({ id: q.groupId, section: q.section, questions: [q] });
      } else {
        groups[groupMap[q.groupId]].questions.push(q);
      }
    });

    return groups;
  }, [answers]);

  const currentGroup = visibleGroups[currentStep] || visibleGroups[0];

  const handleNext = () => {
    // Check if all required questions in current group are answered
    const allRequiredAnswered = currentGroup.questions.every(q => 
      !q.required || (answers[q.id] !== undefined && answers[q.id] !== "")
    );

    if (!allRequiredAnswered) {
      alert("Please fill in all required fields.");
      return;
    }

    if (currentStep < visibleGroups.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAIAction = async (question: Question, action: 'rewrite' | 'suggest') => {
    setIsGenerating(question.id);
    try {
      const res = await fetch('/api/ai/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action, 
          questionId: question.id, 
          questionText: question.question, 
          currentText: answers[question.id] || "",
          context: answers 
        })
      });
      const data = await res.json();
      if (data.suggestion) {
        setAnswers(prev => ({ ...prev, [question.id]: data.suggestion }));
      }
    } catch (e) {
      console.error("AI Error:", e);
    } finally {
      setIsGenerating(null);
    }
  };

  const renderQuestion = (q: Question) => {
    return (
      <div key={q.id} className="mb-8 lg:mb-12 last:mb-0">
        <div className="flex items-start gap-3 mb-4 lg:mb-6">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-50 text-brand-blue rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                {q.id === 'onboarding-type' ? <Building2 className="w-4 h-4 lg:w-5 lg:h-5" /> :
                 q.id === 'user-name' ? <User className="w-4 h-4 lg:w-5 lg:h-5" /> :
                 <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />}
            </div>
            <div className="flex-1">
                <h3 className="text-lg lg:text-2xl font-black text-slate-900 leading-tight flex items-center gap-2">
                    {q.question}
                    {q.required && <span className="text-red-500 text-xs">*</span>}
                </h3>
            </div>
        </div>

        {q.type === 'dropdown' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {q.options?.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                className={`p-3 lg:p-4 rounded-xl border-2 text-left transition-all group flex items-center justify-between ${
                  answers[q.id] === opt 
                    ? 'border-brand-blue bg-brand-blue-soft/50 text-brand-blue font-bold' 
                    : 'border-slate-100 lg:hover:border-brand-blue/30 lg:hover:bg-slate-50'
                }`}
              >
                <span className="text-sm lg:text-base">{opt}</span>
                <CheckCircle2 className={`w-3 h-3 lg:w-4 lg:h-4 transition-all ${answers[q.id] === opt ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
              </button>
            ))}
          </div>
        )}

        {q.type === 'yes-no' && (
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {["Yes", "No"].map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                className={`p-4 lg:p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                  answers[q.id] === opt 
                    ? 'border-brand-blue bg-brand-blue-soft/50 text-brand-blue' 
                    : 'border-slate-100 lg:hover:border-brand-blue/30 lg:hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all ${
                    answers[q.id] === opt ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                    {opt === "Yes" ? <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" /> : <X className="w-4 h-4 lg:w-5 lg:h-5" />}
                </div>
                <span className="text-xs lg:text-lg font-black uppercase tracking-widest">{opt}</span>
              </button>
            ))}
          </div>
        )}

        {q.type === 'text' && (
          <div className="relative">
            <input 
              type="text"
              placeholder={q.placeholder}
              value={answers[q.id] || ""}
              onChange={(e) => {
                let val = e.target.value;
                if (q.id === 'fundraising-goal') {
                  val = val.replace(/\D/g, "");
                  val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                setAnswers({ ...answers, [q.id]: val });
              }}
              className="w-full py-3 lg:py-4 text-lg lg:text-2xl font-black border-b-2 lg:border-b-4 border-slate-100 focus:border-brand-blue focus:outline-none transition-all placeholder:text-slate-300 text-slate-900 bg-transparent"
            />
          </div>
        )}

        {q.type === 'textarea' && (
          <div className="relative group">
            <textarea 
              placeholder={q.placeholder}
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              rows={4}
              className="w-full p-4 lg:p-6 text-sm lg:text-base border-2 border-slate-100 rounded-2xl focus:border-brand-blue focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 bg-white"
            />
            <div className="flex gap-2 mt-3">
                <button 
                    onClick={() => handleAIAction(q, 'rewrite')}
                    disabled={!answers[q.id] || isGenerating !== null}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                    {isGenerating === q.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                    Rewrite AI
                </button>
                <button 
                    onClick={() => handleAIAction(q, 'suggest')}
                    disabled={isGenerating !== null}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white text-brand-blue ring-1 ring-brand-blue/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                    {isGenerating === q.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Bot className="w-3 h-3" />}
                    Smart Suggest
                </button>
                {isGenerating === q.id && (
                  <span className="text-xs font-bold text-brand-blue animate-pulse flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Thinking...
                  </span>
                )}
            </div>
          </div>
        )}

        {q.type === 'upload' && (
          <div className="flex flex-col items-center">
            <label 
              className={`w-full p-8 lg:p-12 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                answers[q.id] 
                  ? 'border-brand-blue bg-brand-blue-soft text-brand-blue' 
                  : 'border-slate-100 hover:border-brand-blue/30 hover:bg-slate-50 text-slate-400'
              }`}
            >
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setAnswers({ ...answers, [q.id]: file.name });
                }} 
              />
              <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all ${
                answers[q.id] ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-300'
              }`}>
                {answers[q.id] ? <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8" /> : <Upload className="w-6 h-6 lg:w-8 lg:h-8" />}
              </div>
              <div className="text-center">
                <p className="text-sm lg:text-lg font-black truncate max-w-[200px]">
                  {answers[q.id] || "Click to upload file"}
                </p>
              </div>
            </label>
            {answers[q.id] && (
              <button 
                onClick={() => setAnswers({ ...answers, [q.id]: "" })}
                className="mt-2 text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        )}

        {q.type === 'multi-select' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options?.map(opt => {
              const currentValues = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
              const isSelected = currentValues.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => {
                    const nextValues = isSelected 
                      ? currentValues.filter((v: string) => v !== opt)
                      : [...currentValues, opt];
                    setAnswers({ ...answers, [q.id]: nextValues });
                  }}
                  className={`p-3 lg:p-4 rounded-xl border-2 text-left transition-all group flex items-center justify-between ${
                    isSelected 
                      ? 'border-brand-blue bg-brand-blue-soft/50 text-brand-blue font-bold' 
                      : 'border-slate-100 lg:hover:border-brand-blue/30 lg:hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm lg:text-base">{opt}</span>
                  <div className={`w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${
                    isSelected ? 'bg-brand-blue border-brand-blue' : 'border-slate-200'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {q.redFlagValue === answers[q.id] && (
          <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-red-50/50 border border-red-100 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-red-900">Mandatory Secondary Review</p>
              <p className="text-xs text-red-700/70 font-medium">Potential flags detected. Review required.</p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  if (isFinished) {
    return (
      <div className="onboarding-container px-4 py-12 lg:py-20 min-h-screen flex flex-col items-center">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
        >
          <div className="text-center mb-16 px-4">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-brand-blue-soft text-brand-blue rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <PartyPopper className="w-10 h-10 lg:w-12 lg:h-12" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full border-4 border-brand-blue/20"
              />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">Submission sent!</h2>
            <p className="text-lg lg:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Great job! You&apos;ve successfully submitted your project details for review.
            </p>
          </div>

          {/* AI SUMMARY SECTION */}
          {(isSummarizing || summary) && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-16 p-8 lg:p-12 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-24 h-24 text-white" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-black text-brand-blue uppercase tracking-[0.3em]">AI Executive Review</span>
                    </div>
                    
                    {isSummarizing ? (
                        <div className="space-y-4">
                            <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-white/10 rounded-full w-1/2 animate-pulse"></div>
                        </div>
                    ) : (
                        <p className="text-lg lg:text-xl font-bold text-white leading-relaxed">
                            {summary}
                        </p>
                    )}
                </div>
             </motion.div>
          )}
          
          <div className="ag-card-premium !p-8 lg:!p-16 !rounded-[3rem] w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
               <div className="flex items-center gap-4">
                 <div className="p-4 bg-brand-blue/10 rounded-2xl">
                   <FileText className="w-8 h-8 text-brand-blue" />
                 </div>
                 <div>
                   <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">Project Blueprint</h3>
                   <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Summary of your project application</p>
                 </div>
               </div>
               <div className="px-5 py-2.5 bg-brand-blue-soft rounded-full text-brand-blue font-black text-xs uppercase tracking-widest flex items-center gap-2 self-start lg:self-center">
                  <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></div>
                  Pending Review
               </div>
            </div>

            <div className="space-y-20">
              {['Identity', 'Project', 'Compliance', 'Financials', 'Final Review'].map(section => {
                const sectionQuestions = onboardingQuestions.filter(q => 
                  q.section.includes(section) && 
                  isQuestionVisible(q, answers) && 
                  answers[q.id]
                );

                if (sectionQuestions.length === 0) return null;

                return (
                  <div key={section} className="relative">
                    <div className="flex items-center gap-4 mb-10">
                      <h4 className="text-sm font-black text-brand-blue uppercase tracking-[0.3em] whitespace-nowrap">
                         {section}
                      </h4>
                      <div className="h-px w-full bg-slate-100"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-12">
                      {sectionQuestions.map(q => {
                        const val = answers[q.id];
                        const isFile = q.type === 'upload';
                        const isMulti = Array.isArray(val);
                        
                        return (
                          <div key={q.id} className="group transition-all">
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                              {q.question}
                            </span>
                            <div className="flex items-start gap-4">
                                {isFile ? (
                                    <div className="flex items-center gap-3 p-4 bg-brand-blue-soft/50 rounded-2xl border border-brand-blue/10 w-full group-hover:border-brand-blue/30 transition-all">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                            <Upload className="w-5 h-5 text-brand-blue" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-brand-blue text-sm lg:text-base break-all">{val}</p>
                                            <p className="text-[10px] text-brand-blue/60 font-black uppercase tracking-widest mt-0.5">Verified Document</p>
                                        </div>
                                    </div>
                                ) : isMulti ? (
                                    <div className="flex flex-wrap gap-2">
                                        {val.map((item: string) => (
                                            <span key={item} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-base font-bold text-slate-900 leading-relaxed group-hover:text-brand-blue transition-colors duration-300">
                                        {val.toString()}
                                    </p>
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col items-center gap-8">
                <div className="text-center">
                    <p className="text-slate-400 font-bold text-sm mb-2">Ready to return to your dashboard?</p>
                    <button onClick={() => window.location.reload()} className="ag-btn-primary min-w-[200px] !py-5 !text-xl !rounded-2xl">
                        Go Home
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="onboarding-container px-2 lg:px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-12 gap-4 lg:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-blue-soft text-brand-blue text-xs font-bold uppercase tracking-widest rounded-full ring-1 ring-brand-blue/10">
              <ShieldCheck className="w-3 h-3" />
              Progress {(currentStep / (visibleGroups.length - 1) * 100).toFixed(0)}%
            </span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest truncate max-w-[150px] lg:max-w-none">• {currentGroup?.section}</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">Smart Onboarding</h2>
        </div>
        <div className="hidden lg:flex items-center bg-white px-6 py-3 rounded-2xl border border-slate-100 font-bold text-slate-500 tabular-nums">
           <span className="text-brand-blue">{currentStep + 1}</span>
           <span className="text-slate-400 font-black mx-2">/</span>
           {visibleGroups.length} screens
        </div>
      </div>

      <div className="onboarding-step-indicator mb-10 lg:mb-16">
        <div 
          className="onboarding-step-progress"
          style={{ width: `${((currentStep + 1) / visibleGroups.length) * 100}%` }}
        ></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
            key={currentGroup?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="ag-card-premium !p-6 lg:!p-12 !rounded-[2.5rem]"
        >
          <div className="space-y-4">
            {currentGroup?.questions.map(renderQuestion)}
          </div>

          <div className="flex items-center gap-3 lg:gap-4 mt-8 lg:mt-12">
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-1 lg:gap-2 p-3 lg:p-4 px-6 lg:px-10 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all text-xs lg:text-base"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 ag-btn-primary justify-center text-sm lg:text-lg py-4 lg:py-5"
            >
              {currentStep === visibleGroups.length - 1 ? "Complete Application" : "Continue"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-8 lg:mt-12 flex items-center justify-center gap-3 text-slate-400 font-bold">
          <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-brand-blue" />
          <p className="text-xs font-bold uppercase tracking-widest">Enhanced by Agathos AI</p>
      </div>
    </div>
  );
}
