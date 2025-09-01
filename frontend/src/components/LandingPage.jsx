import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Sparkles,
  Zap,
  Users,
  Brain,
  FileText,
  Trophy,
  Monitor,
  Cpu,
  Mail,
  Twitter,
  Github,
  Plus,
  Minus,
} from "lucide-react";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSubtext, setCurrentSubtext] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);

  const subtexts = [
    "From blank page to job-ready in under 5 minutes.",
    "Resumate — Where intelligence meets opportunity",
    "First impressions matter. Make yours flawless.",
  ];

  const faqs = [
    {
      question: "What is Resumate?",
      answer:
        "Resumate is an AI-powered resume builder that helps you create professional, ATS-friendly resumes in minutes. Our advanced AI technology analyzes your information and crafts personalized resumes tailored to your target position.",
    },
    {
      question: "Is Resumate free to use?",
      answer:
        "Yes! Resumate offers a completely free tier that allows you to create and download professional resumes without any cost. We believe everyone deserves access to quality resume creation tools.",
    },
    {
      question: "How does the AI work?",
      answer:
        "Our AI analyzes your input information, understands industry standards, and generates content that highlights your strengths. It optimizes your resume for both human recruiters and Applicant Tracking Systems (ATS).",
    },
    {
      question: "Can I customize my resume?",
      answer:
        "Absolutely! While our AI provides a strong foundation, you have full control to edit, customize, and refine your resume to match your personal style and specific job requirements.",
    },
    {
      question: "Can I download my resume?",
      answer:
        "Absolutely! Once your AI-generated resume is ready, you can instantly download it in multiple formats including PDF and Word documents. Your resume is ready to send to employers immediately after creation.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take data security seriously. Your personal information is encrypted and stored securely. We never share your data with third parties, and you maintain full control over your information.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => setIsVisible(true), 100);

    const interval = setInterval(() => {
      setCurrentSubtext((prev) => (prev + 1) % subtexts.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
   const navigate = useNavigate()
  const handleGetStarted = () => {
    navigate("/login")

  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  useEffect(() => {
  const style = document.createElement('style');
  style.textContent = `
    ::-webkit-scrollbar { 
      width: 8px; 
    }
    ::-webkit-scrollbar-track { 
      background: #1C1C23; 
      border-radius: 10px; 
    }
    ::-webkit-scrollbar-thumb { 
      background: #A0A0F0; 
      border-radius: 10px; 
    }
    ::-webkit-scrollbar-thumb:hover { 
      background: #D9D9F3; 
    }
    html {
      scrollbar-width: thin;
      scrollbar-color: #A0A0F0 #1C1C23;
    }
  `;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, []);

  return (
   <div className="min-h-screen bg-gradient-to-b from-[#1A1929] to-[#0C0B10] text-[#E0E0E0] font-sans overflow-auto">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      {/* Fixed Navigation Header */}
      <nav className="fixed mt-5 top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-[#1C1C23]/80 backdrop-blur-lg rounded-full border border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="text-white">Resu</span>
              <span className="text-[#A0A0F0]">mate</span>
            </button>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection("features")}
                className="group relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10 font-medium">About</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#A0A0F0] group-hover:w-full transition-all duration-300"></div>
              </button>

              <button
                onClick={() => scrollToSection("why-section")}
                className="group relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10 font-medium">Why Us</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#A0A0F0] group-hover:w-full transition-all duration-300"></div>
              </button>
              <button
                onClick={() => scrollToSection("faqs")}
                className="group relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10 font-medium">FAQs</span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#A0A0F0] group-hover:w-full transition-all duration-300"></div>
              </button>

              <button
                onClick={handleGetStarted}
                className="group relative px-6 py-3 bg-[#D9D9F3] text-black rounded-full font-semibold transition-all duration-300 hover:bg-white hover:shadow-[#D9D9F3]/40 hover:scale-105"
              >
                <span className="relative z-10">Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 mt-10 text-white leading-tight roboto">
              Need a resume fast?
              <br />
              Let <span className="text-[#A0A0F0] story-script">AI</span> do the
              heavy lifting.
            </h1>

            {/* Image Placeholder */}
            <div className="my-12 flex justify-center">
              <div className="w-full max-w-4xl h-[600px] bg-[#1C1C23]/50 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-black/50">
                {/* You can place your image here */}
                <img
                  src="/hero.png"
                  alt="Resume preview"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="h-24 flex items-center justify-center mb-12 relative">
              {subtexts.map((text, index) => (
                <div
                  key={index}
                  className={`absolute text-3xl md:text-4xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-700 ease-in-out ${
                    index === currentSubtext
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            {/* <ChevronDown className="w-8 h-8 text-gray-500" /> */}
          </div>
        </div>
      </section>

      {/* What Section */}
      <section id="features" className="relative z-10 py-30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              WHAT WE DO
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Revolutionizing resume creation with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Zap className="w-12 h-12 text-[#D9D9F3]" />,
                title: "Instant Generation",
                description:
                  "Create professional resumes in seconds with our advanced AI algorithms",
              },
              {
                icon: <Brain className="w-12 h-12 text-[#A0A0F0]" />,
                title: "Smart Optimization",
                description:
                  "AI analyzes job descriptions and optimizes your resume for maximum impact",
              },
              {
                icon: <Trophy className="w-12 h-12 text-[#D9D9F3]" />,
                title: "ATS Friendly",
                description:
                  "Ensures your resume passes through Applicant Tracking Systems seamlessly",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-[#1C1C23]/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#A0A0F0]/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#A0A0F0] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why-section" className="relative z-10 py-30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              WHY CHOOSE US
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The future of resume creation is here, and it's powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Save Time",
                  description:
                    "What takes hours traditionally, we accomplish in minutes. Focus on what matters most - landing your dream job.",
                },
                {
                  number: "02",
                  title: "Professional Quality",
                  description:
                    "Our AI understands industry standards and creates resumes that stand out to hiring managers.",
                },
                {
                  number: "03",
                  title: "Personalized Content",
                  description:
                    "Every resume is uniquely crafted based on your experience, skills, and target position.",
                },
                {
                  number: "04",
                  title: "Continuous Learning",
                  description:
                    "Our AI constantly evolves with hiring trends and market demands to keep you ahead.",
                },
              ].map((reason, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="text-4xl font-bold text-[#A0A0F0] group-hover:text-[#D9D9F3] transition-colors">
                    {reason.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#A0A0F0] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A0A0F0]/10 to-[#D9D9F3]/10 rounded-2xl blur-3xl"></div>
              <div className="relative bg-[#1C1C23]/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-[#A0A0F0] mx-auto mb-6" />
                  <div className="text-2xl font-bold text-white mb-4">
                    AI-Powered Technology
                  </div>
                  <div className="text-gray-400 mb-6 leading-relaxed">
                    Advanced algorithms trained on thousands of successful
                    resumes to ensure maximum impact
                  </div>
                  <div className="text-2xl font-bold text-[#A0A0F0] mb-2">
                    100%
                  </div>
                  <div className="text-gray-400">Free to Use</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="relative z-10 py-30 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1C1C23]/80 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#A0A0F0]/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl font-semibold text-white">
                    {faq.question}
                  </span>
                  <div className="ml-4 flex-shrink-0">
                    {openFAQ === index ? (
                      <Minus className="w-6 h-6 text-[#A0A0F0]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#A0A0F0]" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-8 pb-6">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#0C0B10] border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">Resu</span>
                <span className="text-[#A0A0F0]">mate</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Ready to Transform Your Career?
              </p>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">LEGAL</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#A0A0F0] transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-[#A0A0F0] transition-colors"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-4">CONTACT</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:kishoraman2121.com"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#A0A0F0] transition-colors"
                  >
                    <Mail size={16} /> kishoraman2121.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/kishoraman21"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#A0A0F0] transition-colors"
                  >
                    <Twitter size={16} /> @kishoraman21
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/kishoraman21"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#A0A0F0] transition-colors"
                  >
                    <Github size={16} /> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex justify-between items-center text-sm text-gray-500">
            <p>© 2025 Resumate. All rights reserved.</p>
            <p className="text-[#A0A0F0] font-medium">
              Let AI do the heavy lifting.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
