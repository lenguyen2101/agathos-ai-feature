import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Skills from "@/components/Skills";
import HowItWorks from "@/components/HowItWorks";
import Credits from "@/components/Credits";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Skills />
        <HowItWorks />
        <Credits />
      </main>
      <Footer />
    </>
  );
}
