"use client";

import OnboardingFlow from "@/components/OnboardingFlow";

export default function OnboardingPage() {
  const handleComplete = (data: Record<string, string | string[]>) => {
    console.log("Onboarding Complete:", data);
  };
  return <OnboardingFlow onComplete={handleComplete} />;
}
