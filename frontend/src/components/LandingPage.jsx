import React, { useState, useEffect, use } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSubtext, setCurrentSubtext] = useState(0);

  const subtexts = [
    "From blank page to job-ready in under 5 minutes.",
    "ResumAI — Where intelligence meets opportunity",
    "First impressions matter. Make yours flawless.",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Rotate subtexts every 5 seconds
    const interval = setInterval(() => {
      setCurrentSubtext((prev) => (prev + 1) % subtexts.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();
  const handleGetStarted = () => {
    // Handle get started action - could navigate to external auth page or show modal
    console.log("Get Started clicked");
    navigate("/login")

    
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fixed Navigation Header */}
      <nav className="fixed mt-5 top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <span className="text-purple-400">Resum</span>
              <span className="text-blue-400">AI</span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection("features")}
                className="group relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 font-medium">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>

              <button
                onClick={() => scrollToSection("why-section")}
                className="group relative px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 font-medium">Why Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>

              <button
                onClick={handleGetStarted}
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Blur overlay for content under navbar */}
      <div
        className="fixed top-0 left-0 w-full h-24 bg-black/20 backdrop-blur-sm z-40 pointer-events-none"
        style={{
          opacity: scrollY > 50 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      ></div>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Punch Line with gradient and pulse animation */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse leading-tight">
              Need a resume fast?
              <br />
              Let AI do the heavy lifting.
            </h1>

            {/* Animated Subtext */}
            <div className="h-24 flex items-center justify-center mb-12 mt-8 relative">
              {subtexts.map((text, index) => (
                <div
                  key={index}
                  className={`absolute text-3xl md:text-4xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium transition-all duration-700 ease-in-out ${
                    index === currentSubtext
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    textShadow: "0 2px 10px rgba(147, 51, 234, 0.3)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Animated Icons */}
          <div
            className={`flex justify-center gap-8 mb-12 mt-16 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="animate-bounce delay-100">
              <Monitor className="w-12 h-12 text-purple-400" />
            </div>
            <div className="animate-bounce delay-200">
              <Cpu className="w-12 h-12 text-pink-400" />
            </div>
            <div className="animate-bounce delay-300">
              <FileText className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </section>

      {/* What Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.001),
            }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              WHAT WE DO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionizing resume creation with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Zap className="w-12 h-12 text-yellow-400" />,
                title: "Instant Generation",
                description:
                  "Create professional resumes in seconds with our advanced AI algorithms",
              },
              {
                icon: <Brain className="w-12 h-12 text-purple-400" />,
                title: "Smart Optimization",
                description:
                  "AI analyzes job descriptions and optimizes your resume for maximum impact",
              },
              {
                icon: <Trophy className="w-12 h-12 text-blue-400" />,
                title: "ATS Friendly",
                description:
                  "Ensures your resume passes through Applicant Tracking Systems seamlessly",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why-section" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              WHY CHOOSE US
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                <div
                  key={index}
                  className="flex gap-6 group"
                  style={{
                    animation: `slideInRight 0.6s ease-out ${
                      index * 0.1
                    }s both`,
                  }}
                >
                  <div className="text-4xl font-bold text-purple-400 group-hover:text-pink-400 transition-colors">
                    {reason.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <div className="text-center">
                  <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                  <div className="text-4xl font-bold text-white mb-2">
                    10,000+
                  </div>
                  <div className="text-gray-300 mb-4">
                    Successful Resumes Created
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    95%
                  </div>
                  <div className="text-gray-300">Interview Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already discovered the power
            of AI-driven resume creation.
          </p>
          <button
            className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1"
            onClick={handleGetStarted}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Now
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes subtextFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          10% {
            opacity: 0.8;
            transform: translateY(10px) scale(0.98);
          }
          20% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          90% {
            opacity: 0.8;
            transform: translateY(-10px) scale(0.98);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }

        @keyframes subtextFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          10% {
            opacity: 0.8;
            transform: translateY(10px) scale(0.98);
          }
          20% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          90% {
            opacity: 0.8;
            transform: translateY(-10px) scale(0.98);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-subtextFade {
          animation: subtextFade 5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;