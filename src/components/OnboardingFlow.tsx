"use client";

import React, { useState } from "react";
import { onboardingQuestions } from "@/lib/onboarding-questions";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Info,
  ShieldCheck,
  Building2,
  User,
  PartyPopper,
  X,
  Zap,
  Upload,
  FileText,
  FileSearch
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingFlow({ onComplete }: { onComplete: (data: any) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState(false);

  const visibleQuestions = onboardingQuestions.filter(q => {
    if (!q.dependsOn) return true;
    return answers[q.dependsOn.questionId] === q.dependsOn.value;
  });

  const question = visibleQuestions[currentStep];

  const handleNext = () => {
    if (currentStep < visibleQuestions.length - 1) {
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

  if (isFinished) {
    return (
      <div className="onboarding-container px-4 py-12 lg:py-20 min-h-screen flex flex-col justify-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ag-card-premium text-center !p-8 lg:!p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue opacity-10"></div>
          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-brand-blue-soft text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-10 shadow-xl shadow-blue-500/10">
            <PartyPopper className="w-8 h-8 lg:w-12 lg:h-12" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Submission sent!</h2>
          <p className="text-base lg:text-xl text-slate-500 mb-8 lg:mb-12 font-medium max-w-md mx-auto">
            Great job! You've successfully submitted your project details for review. Rachel will be in touch within 2-3 working days.
          </p>
          
          <div className="bg-slate-50 p-6 lg:p-8 rounded-3xl text-left border border-slate-100 max-w-xl mx-auto shadow-inner">
            <h3 className="font-black text-brand-blue mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Comprehensive Summary
            </h3>
              {visibleQuestions.map((q) => {
                const val = answers[q.id];
                if (val === undefined || val === null || val === '') return null;
                const isFile = q.type === 'upload';
                return (
                  <div key={q.id} className="flex flex-col gap-1.5 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-[0.15em] leading-relaxed">
                      {q.question}
                    </span>
                    <span className={`font-bold text-slate-900 text-base lg:text-lg flex items-center gap-2 ${isFile ? 'text-brand-blue' : ''}`}>
                      {isFile ? (
                        <>
                          <FileText className="w-4 h-4" />
                          {val}
                        </>
                      ) : (
                        val.toString()
                      )}
                    </span>
                  </div>
                );
              })}
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="ag-btn-primary mt-10 mx-auto w-full lg:w-auto justify-center"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="onboarding-container px-2 lg:px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-12 gap-4 lg:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-blue-soft text-brand-blue text-[9px] lg:text-[10px] font-black uppercase tracking-widest rounded-full ring-1 ring-brand-blue/10">
              <ShieldCheck className="w-3 h-3" />
              Step {currentStep + 1}
            </span>
            <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[150px] lg:max-w-none">• {question.section}</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">Smart Onboarding</h2>
        </div>
        <div className="hidden lg:flex items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 font-bold text-slate-500 tabular-nums">
           <span className="text-brand-blue">{currentStep + 1}</span>
           <span className="text-slate-400 font-black mx-2">/</span>
           {visibleQuestions.length}
        </div>
      </div>

      <div className="onboarding-step-indicator mb-10 lg:mb-16">
        <div 
          className="onboarding-step-progress"
          style={{ width: `${((currentStep + 1) / visibleQuestions.length) * 100}%` }}
        ></div>
        <div className="lg:hidden flex justify-between mt-2 px-1 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span>In Progress</span>
            <span>Step {currentStep + 1} of {visibleQuestions.length}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="ag-card-premium !p-6 lg:!p-16 !rounded-[2.5rem]"
        >
          <div className="flex items-start lg:items-center gap-4 mb-6 lg:mb-8">
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 text-brand-blue rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0">
                 {question.id === 'onboarding-type' ? <Building2 className="w-5 h-5 lg:w-6 lg:h-6" /> :
                  question.id === 'user-name' ? <User className="w-5 h-5 lg:w-6 lg:h-6" /> :
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />}
             </div>
             <h3 className="text-xl lg:text-3xl font-black text-slate-900 leading-tight">
                {question.question}
             </h3>
          </div>

          <div className="mb-8 lg:mb-12">
            {question.type === 'dropdown' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                {question.options?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [question.id]: opt })}
                    className={`p-4 lg:p-6 rounded-2xl border-2 text-left transition-all group flex items-center justify-between ${
                      answers[question.id] === opt 
                        ? 'border-brand-blue bg-brand-blue-soft/50 text-brand-blue font-bold shadow-lg shadow-blue-500/5' 
                        : 'border-slate-100 lg:hover:border-brand-blue/30 lg:hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-sm lg:text-lg">{opt}</span>
                    <CheckCircle2 className={`w-4 h-4 lg:w-5 lg:h-5 transition-all ${answers[question.id] === opt ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                  </button>
                ))}
              </div>
            )}

            {question.type === 'yes-no' && (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-6">
                {["Yes", "No"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [question.id]: opt })}
                    className={`p-6 lg:p-10 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 lg:gap-4 ${
                      answers[question.id] === opt 
                        ? 'border-brand-blue bg-brand-blue-soft/50 text-brand-blue shadow-lg shadow-blue-500/5' 
                        : 'border-slate-100 lg:hover:border-brand-blue/30 lg:hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center transition-all ${
                        answers[question.id] === opt ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                        {opt === "Yes" ? <CheckCircle2 className="w-5 h-5 lg:w-8 lg:h-8" /> : <X className="w-5 h-5 lg:w-8 lg:h-8" />}
                    </div>
                    <span className="text-xs lg:text-2xl font-black uppercase tracking-widest">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {question.type === 'text' && (
              <div className="relative">
                <input 
                  type="text"
                  autoFocus
                  placeholder={question.placeholder}
                  value={answers[question.id] || ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (question.id === 'project-goal') {
                      val = val.replace(/\D/g, "");
                      val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    setAnswers({ ...answers, [question.id]: val });
                  }}
                  className="w-full py-4 lg:py-8 text-xl lg:text-4xl font-black border-b-4 lg:border-b-8 border-slate-100 focus:border-brand-blue focus:outline-none transition-all placeholder:text-slate-300 text-slate-900 bg-transparent"
                />
                <div className="absolute right-2 bottom-4 text-slate-200 pointer-events-none hidden lg:block">
                    <Zap className="w-6 h-6" />
                </div>
              </div>
            )}

            {question.type === 'textarea' && (
              <textarea 
                autoFocus
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                rows={4}
                className="w-full p-4 lg:p-8 text-sm lg:text-xl border-2 border-slate-100 rounded-3xl focus:border-brand-blue focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 bg-white shadow-inner"
              />
            )}

            {question.type === 'upload' && (
              <div className="flex flex-col items-center">
                <label 
                  className={`w-full p-10 lg:p-20 border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                    answers[question.id] 
                      ? 'border-brand-blue bg-brand-blue-soft text-brand-blue' 
                      : 'border-slate-100 hover:border-brand-blue/30 hover:bg-slate-50 text-slate-400'
                  }`}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setAnswers({ ...answers, [question.id]: file.name });
                    }} 
                  />
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all ${
                    answers[question.id] ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-300'
                  }`}>
                    {answers[question.id] ? <CheckCircle2 className="w-8 h-8 lg:w-10 lg:h-10" /> : <Upload className="w-8 h-8 lg:w-10 lg:h-10" />}
                  </div>
                  <div className="text-center">
                    <p className="text-lg lg:text-2xl font-black mb-1">
                      {answers[question.id] || "Click to upload file"}
                    </p>
                    <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-60">
                      PDF, JPG or PNG (MAX. 10MB)
                    </p>
                  </div>
                </label>
                {answers[question.id] && (
                  <button 
                    onClick={() => setAnswers({ ...answers, [question.id]: null })}
                    className="mt-4 text-xs font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors"
                  >
                    Remove file
                  </button>
                )}
              </div>
            )}

            {question.type === 'multi-select' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                {question.options?.map(opt => {
                  const currentValues = Array.isArray(answers[question.id]) ? answers[question.id] : [];
                  const isSelected = currentValues.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        const nextValues = isSelected 
                          ? currentValues.filter((v: string) => v !== opt)
                          : [...currentValues, opt];
                        setAnswers({ ...answers, [question.id]: nextValues });
                      }}
                      className={`p-4 lg:p-6 rounded-2xl border-2 text-left transition-all group flex items-center justify-between ${
                        isSelected 
                          ? 'border-brand-blue bg-brand-blue-soft/50 text-brand-blue font-bold shadow-lg shadow-blue-500/5' 
                          : 'border-slate-100 lg:hover:border-brand-blue/30 lg:hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm lg:text-lg">{opt}</span>
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                        isSelected ? 'bg-brand-blue border-brand-blue' : 'border-slate-200'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {currentStep > 0 && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-1 lg:gap-2 p-3 lg:p-4 px-6 lg:px-10 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all text-xs lg:text-base"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="flex-1 ag-btn-primary justify-center text-sm lg:text-xl py-4 lg:py-6 shadow-2xl shadow-blue-500/30 disabled:grayscale disabled:opacity-50"
            >
              {currentStep === visibleQuestions.length - 1 ? "Complete" : "Continue"}
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>

          {question.redFlagValue === answers[question.id] && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 lg:mt-10 p-4 lg:p-6 bg-red-50/50 border border-red-100 rounded-2xl lg:rounded-3xl flex items-start gap-3 lg:gap-4"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 text-red-600 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <div>
                <p className="text-xs lg:text-base font-black text-red-900">Mandatory Secondary Review</p>
                <p className="text-[10px] lg:text-sm text-red-700/70 font-medium">Potential PEP/Sanctions flags detected. Secondary review required.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-8 lg:mt-12 flex items-center justify-center gap-3 text-slate-400 font-bold">
          <Info className="w-3 h-3 lg:w-4 lg:h-4" />
          <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest">End-to-End Encryption Enabled</p>
      </div>
    </div>
  );
}
