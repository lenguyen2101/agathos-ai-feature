"use client";

import React, { useState } from "react";
import {
  Type,
  AlignLeft,
  FileText,
  ChevronDown,
  Hash,
  Calendar,
  ToggleRight,
  Upload,
  CircleDot,
  Info,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createEventSteps,
  createEventFaqs,
  CreateEventField,
  FieldInputType,
} from "@/lib/create-event-guide";

const INPUT_ICONS: Record<FieldInputType, React.ComponentType<{ className?: string }>> = {
  text: Type,
  textarea: AlignLeft,
  "rich-text": FileText,
  dropdown: ChevronDown,
  number: Hash,
  "date-time": Calendar,
  toggle: ToggleRight,
  upload: Upload,
  radio: CircleDot,
};

const INPUT_LABEL: Record<FieldInputType, string> = {
  text: "Text",
  textarea: "Textarea",
  "rich-text": "Rich text",
  dropdown: "Dropdown",
  number: "Number",
  "date-time": "Date-time",
  toggle: "Toggle",
  upload: "Upload",
  radio: "Radio",
};

export default function CreateEventGuide({
  onAskAI,
}: {
  onAskAI?: (query: string) => void;
}) {
  const [activeStepId, setActiveStepId] = useState(createEventSteps[0].id);
  const activeStep =
    createEventSteps.find((s) => s.id === activeStepId) ?? createEventSteps[0];

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* HEADER */}
      <div>
        <p className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] mb-3">
          Interactive Guide
        </p>
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-3">
          Creating an Event
        </h1>
        <p className="text-base lg:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
          A visual walkthrough of the 4-step flow at{" "}
          <span className="font-bold text-slate-700">agathos.be/events/create</span>.
          Click any field to ask the AI for details.
        </p>
      </div>

      {/* STEPPER */}
      <div className="ag-card-premium !p-6 lg:!p-8 !rounded-[2rem]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {createEventSteps.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`text-left p-4 lg:p-5 rounded-2xl border-2 transition-all group ${
                  isActive
                    ? "border-brand-blue bg-brand-blue-soft/50"
                    : "border-slate-100 hover:border-brand-blue/30 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-colors ${
                      isActive
                        ? "bg-brand-blue text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    {step.number}
                  </span>
                  {step.skippable && (
                    <span className="text-[9px] lg:text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      Skippable
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm lg:text-base font-black leading-tight ${
                    isActive ? "text-brand-blue" : "text-slate-900"
                  }`}
                >
                  {step.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 font-black text-lg lg:text-xl">
              {activeStep.number}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-1">
                {activeStep.title}
              </h2>
              <p className="text-sm lg:text-base text-slate-500 font-medium leading-relaxed">
                {activeStep.subtitle}
              </p>
              {activeStep.skippable && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs lg:text-sm font-bold text-amber-900 leading-relaxed">
                    This step is optional — you can skip it if not needed.
                  </p>
                </div>
              )}
            </div>
          </div>

          {activeStep.fields.length === 0 ? (
            <ReviewSubmitPanel onAskAI={onAskAI} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
              {activeStep.fields.map((field) => (
                <FieldCard key={field.id} field={field} onAskAI={onAskAI} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* COMMON QUESTIONS */}
      <section className="ag-card-premium !p-6 lg:!p-10 !rounded-[2.5rem] border-t-4 border-t-brand-blue">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-blue-soft text-brand-blue rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em]">
              Ask the AI
            </p>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Common Questions
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {createEventFaqs.map((faq) => (
            <button
              key={faq.question}
              onClick={() => onAskAI?.(faq.askHint)}
              disabled={!onAskAI}
              className="text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-brand-blue/30 hover:bg-slate-50 transition-all flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex-1 text-sm font-bold text-slate-700 group-hover:text-brand-blue leading-relaxed">
                {faq.question}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function FieldCard({
  field,
  onAskAI,
}: {
  field: CreateEventField;
  onAskAI?: (query: string) => void;
}) {
  const Icon = INPUT_ICONS[field.inputType];
  return (
    <div className="ag-card-premium !p-5 lg:!p-6 !rounded-2xl flex flex-col gap-3 group hover:border-brand-blue/20 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-brand-blue-soft text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="text-sm lg:text-base font-black text-slate-900 leading-tight">
                {field.name}
              </h4>
              {field.required ? (
                <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Required
                </span>
              ) : (
                <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Optional
                </span>
              )}
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {INPUT_LABEL[field.inputType]}
              {field.limit ? ` • ${field.limit}` : ""}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{field.purpose}</p>

      <div className="flex flex-wrap gap-2">
        {field.defaultValue && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">
            <Check className="w-3 h-3 text-brand-blue" />
            Default: <span className="text-slate-900">{field.defaultValue}</span>
          </span>
        )}
        {field.conditional && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1">
            <Info className="w-3 h-3" />
            {field.conditional}
          </span>
        )}
        {field.validation && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1">
            <AlertCircle className="w-3 h-3" />
            {field.validation}
          </span>
        )}
      </div>

      {field.options && field.options.length > 0 && (
        <div className="mt-1 pt-3 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Options
          </p>
          <ul className="space-y-1">
            {field.options.map((opt) => (
              <li key={opt} className="text-xs text-slate-600 flex items-start gap-1.5">
                <span className="text-brand-blue mt-0.5">•</span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {field.notes && field.notes.length > 0 && (
        <div className="space-y-1.5">
          {field.notes.map((note) => (
            <p
              key={note}
              className="text-xs text-slate-500 leading-relaxed flex items-start gap-1.5"
            >
              <Info className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
              <span>{note}</span>
            </p>
          ))}
        </div>
      )}

      <button
        onClick={() => onAskAI?.(field.askHint)}
        disabled={!onAskAI}
        className="mt-auto inline-flex items-center gap-1.5 text-xs font-black text-brand-blue bg-brand-blue-soft/50 hover:bg-brand-blue hover:text-white px-3 py-2 rounded-lg transition-colors self-start uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-3 h-3" />
        Ask AI
      </button>
    </div>
  );
}

function ReviewSubmitPanel({
  onAskAI,
}: {
  onAskAI?: (query: string) => void;
}) {
  const sections = [
    "Banner, Event Type, Ticketing Type",
    "Event Start & End Time",
    "Event Title and About Event",
    "Location with Google Maps preview",
    "All tickets (name, price, quantity, description)",
    "Registration Form (if set up)",
  ];
  return (
    <div className="ag-card-premium !p-6 lg:!p-8 !rounded-2xl space-y-5">
      <div>
        <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] mb-2">
          What you&apos;ll review
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sections.map((s) => (
            <li
              key={s}
              className="text-sm text-slate-700 flex items-start gap-2 font-medium"
            >
              <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-brand-blue-soft/40 border border-brand-blue/10 rounded-xl flex items-start gap-3">
        <Info className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
        <p className="text-xs lg:text-sm text-slate-700 font-medium leading-relaxed">
          Click <span className="font-black text-brand-blue">Submit</span> to send the event
          to the Agathos team for approval. You can still edit the event after it&apos;s
          published.
        </p>
      </div>
      <button
        onClick={() =>
          onAskAI?.(
            "What happens after I click Submit on Step 4 of creating an event?"
          )
        }
        disabled={!onAskAI}
        className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue bg-brand-blue-soft/50 hover:bg-brand-blue hover:text-white px-3 py-2 rounded-lg transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-3 h-3" />
        Ask what happens after Submit
      </button>
    </div>
  );
}
