import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BrainIcon,
  ShieldIcon,
  ZapIcon,
} from "../components/Icons";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117] text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative isolate pt-14 lg:pt-20 overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse-subtle pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* <div className="mb-8 flex justify-center">
              <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                🚀 Now powered by Gemini 2.0 Flash
              </span>
            </div> */}

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
              Chat with your documents <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-400 dark:via-blue-400 dark:to-cyan-400">
                in seconds.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform static PDFs into interactive conversations. Extract
              insights, summarize reports, and find answers instantly using our
              advanced AI.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/app"
                className="group relative inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 transition-all hover:scale-105"
              >
                Get Started for Free
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 sm:mt-24 p-2 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 lg:rounded-3xl lg:p-4 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl shadow-indigo-500/10"
          >
            <InteractiveMockup />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-white dark:bg-[#0b0c11]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              Productivity Supercharged
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to master your documents
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {[
                {
                  name: "Instant Analysis",
                  description:
                    "Upload any PDF and get summaries, key takeaways, and answers in milliseconds.",
                  icon: ZapIcon,
                },
                {
                  name: "Secure & Private",
                  description:
                    "Your documents are processed securely and are never used to train our models without permission.",
                  icon: ShieldIcon,
                },
                {
                  name: "AI Reasoning",
                  description:
                    "Powered by Gemini 2.0, capable of complex reasoning and understanding nuance.",
                  icon: BrainIcon,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16 group">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 dark:bg-indigo-600/20 group-hover:bg-indigo-600 transition-colors">
                      <feature.icon
                        className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#0f1117] border-t border-gray-200 dark:border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 DocuBrain AI. Built by Gaganjeet Singh.</p>
        </div>
      </footer>
    </div>
  );
};

// Separate component to handle the specific interactive logic cleanly
const InteractiveMockup = () => {
  const [step, setStep] = useState(0); // 0: Initial, 1: Asking, 2: Answered

  return (
    <div className="rounded-xl lg:rounded-2xl bg-white dark:bg-[#0f1117] border border-gray-200 dark:border-white/5 overflow-hidden shadow-inner relative aspect-[16/9] group flex flex-col text-left">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 bg-repeat bg-[length:100px_100px] pointer-events-none"></div>

      {/* Browser Toolbar */}
      <div className="h-8 border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-2 bg-gray-50 dark:bg-[#13161c]">
        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
        <div className="ml-4 flex-1 h-5 bg-gray-200 dark:bg-white/5 rounded-md max-w-sm mx-auto opacity-50"></div>
      </div>

      <div className="grid grid-cols-2 flex-1 overflow-hidden z-0 relative">
        {/* Left: PDF View */}
        <div className="border-r border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#13161c] hidden md:flex flex-col">
          <div className="h-10 border-b border-gray-200 dark:border-white/5 flex items-center px-4 justify-between bg-white dark:bg-[#0f1117]">
            <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
            <div className="flex gap-2">
              <div className="h-4 w-4 rounded bg-gray-200 dark:bg-white/10"></div>
              <div className="h-4 w-4 rounded bg-gray-200 dark:bg-white/10"></div>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 overflow-hidden relative">
            <div className="w-full h-full bg-white dark:bg-white/5 rounded shadow-sm border border-gray-200 dark:border-white/5 p-8 space-y-4 relative overflow-hidden">
              <div
                className={`w-1/2 h-4 rounded mb-8 transition-colors duration-500 ${
                  step >= 2
                    ? "bg-indigo-200 dark:bg-indigo-500/30"
                    : "bg-gray-800 dark:bg-gray-300/50"
                }`}
              ></div>

              <div className="space-y-3">
                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                <div
                  className={`h-2 rounded w-[90%] transition-colors duration-500 ${
                    step >= 2
                      ? "bg-indigo-200 dark:bg-indigo-500/30"
                      : "bg-gray-200 dark:bg-white/10"
                  }`}
                ></div>
                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded w-[95%]"></div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="w-1/3 h-3 bg-gray-300 dark:bg-white/20 rounded mb-4"></div>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 bg-gray-200 dark:bg-white/10 rounded w-full"
                    style={{ width: `${85 + ((i * 3) % 15)}%` }}
                  ></div>
                ))}
              </div>

              {/* Scanning effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Right: Chat View */}
        <div className="flex flex-col relative overflow-hidden bg-white dark:bg-[#0f1117]">
          {/* Chat Header */}
          <div className="h-12 border-b border-gray-100 dark:border-white/5 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-end space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 flex-shrink-0">
                <BrainIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-4 rounded-2xl rounded-tl-none text-sm space-y-2.5 max-w-[85%] shadow-sm">
                <div className="h-2 w-48 bg-gray-200 dark:bg-white/10 rounded"></div>
                <div className="h-2 w-32 bg-gray-200 dark:bg-white/10 rounded"></div>
              </div>
            </div>

            {/* User Message (Appears in Step 1) */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-end"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-lg shadow-indigo-500/20 max-w-[85%]">
                  <p className="font-medium">Summarize the key points.</p>
                </div>
              </motion.div>
            )}

            {/* Bot Reply (Appears in Step 2) */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 flex-shrink-0">
                  <BrainIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-4 rounded-2xl rounded-tl-none text-sm space-y-2.5 w-full shadow-sm">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Here are the main takeaways from the document:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300 marker:text-indigo-500">
                    <li>Revenue grew by 25% YoY.</li>
                    <li>New AI features launched in Q3.</li>
                    <li>Customer retention is up 15%.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Interactable Input Area */}
          <div className="p-4 border-t border-gray-100 dark:border-white/5">
            {step === 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-center text-gray-400 font-medium uppercase tracking-wider">
                  Try asking a question
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setStep(1);
                      setTimeout(() => setStep(2), 1500);
                    }}
                    className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-medium rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors border border-indigo-200 dark:border-indigo-500/20"
                  >
                    Summarize this doc
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setTimeout(() => setStep(2), 1500);
                    }}
                    className="px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10 hidden sm:block"
                  >
                    Explain key terms
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-[#1a1d26] p-2 pr-2 pl-4 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-between opacity-50 cursor-not-allowed">
                <div className="text-gray-400 dark:text-gray-500 text-sm">
                  Ask a follow up...
                </div>
                <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-md shadow-indigo-500/20">
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
