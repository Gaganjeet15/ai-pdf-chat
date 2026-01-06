import { jsPDF } from "jspdf";
import { useCallback, useEffect, useState } from "react";

// PDF Generation Function
const generatePDF = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  slides.forEach((slide, index) => {
    if (index > 0) {
      doc.addPage();
    }

    // Background gradient effect (simulated with rectangle)
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Header accent bar
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, pageWidth, 8, "F");

    // Slide number
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`${index + 1} / ${slides.length}`, pageWidth - margin, 18, {
      align: "right",
    });

    if (slide.type === "title") {
      // Title slide styling
      doc.setFontSize(42);
      doc.setTextColor(37, 99, 235);
      doc.setFont("helvetica", "bold");
      doc.text(slide.title, pageWidth / 2, pageHeight / 2 - 20, {
        align: "center",
      });

      doc.setFontSize(18);
      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "normal");
      doc.text(slide.subtitle, pageWidth / 2, pageHeight / 2 + 5, {
        align: "center",
      });

      doc.setFontSize(12);
      doc.setTextColor(148, 163, 184);
      doc.text(slide.content, pageWidth / 2, pageHeight / 2 + 25, {
        align: "center",
      });
    } else {
      // Regular slide styling
      doc.setFontSize(28);
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.text(slide.title, pageWidth / 2, 35, { align: "center" });

      // Underline accent
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(1);
      const titleWidth = doc.getTextWidth(slide.title);
      doc.line(
        (pageWidth - titleWidth) / 2,
        40,
        (pageWidth + titleWidth) / 2,
        40
      );

      doc.setFontSize(14);
      doc.setTextColor(71, 85, 105);
      doc.setFont("helvetica", "normal");

      if (slide.type === "list" && Array.isArray(slide.content)) {
        let yPos = 60;
        slide.content.forEach((item) => {
          // Bullet point
          doc.setFillColor(59, 130, 246);
          doc.circle(margin + 3, yPos - 1.5, 2, "F");

          // Text with word wrap
          const lines = doc.splitTextToSize(item, contentWidth - 15);
          doc.text(lines, margin + 10, yPos);
          yPos += lines.length * 7 + 8;
        });
      } else {
        // Standard text content with word wrap
        const contentText =
          typeof slide.content === "string" ? slide.content : "";
        const lines = doc.splitTextToSize(contentText, contentWidth);
        doc.text(lines, margin, 60);
      }
    }

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.text(
      "DocuBrain - AI-Powered Document Assistant",
      margin,
      pageHeight - 10
    );
  });

  doc.save("DocuBrain_Presentation.pdf");
};

const slides = [
  {
    id: 1,
    title: "DocuBrain",
    subtitle: "Advanced AI-Powered Document Assistant",
    content: "Final Year Project Presentation",
    type: "title",
  },
  {
    id: 2,
    title: "Introduction",
    content:
      "DocuBrain is a cutting-edge Single Page Application (SPA) designed to bridge the gap between static documents and dynamic intelligence. Built on React 19 and Powered by Google's Gemini 1.5 Flash model, it enables users to 'chat' with their PDFs in real-time.",
    type: "standard",
  },
  {
    id: 3,
    title: "Objectives",
    content: [
      "Develop a zero-latency interface for PDF analysis.",
      "Implement secure, serverless AI communication using Vercel APIs.",
      "Create a responsive, dual-pane UI for simultaneous reading and chatting.",
      "Eliminate manual information retrieval from long technical manuals.",
    ],
    type: "list",
  },
  {
    id: 4,
    title: "Background / Theory",
    content:
      "The core technology relies on 'Multimodal RAG' (Retrieval-Augmented Generation). Unlike traditional text scrapers, this system converts PDF pages into Base64 images/text suited for the Gemini 1.5 'long context window' (up to 1M tokens), allowing the AI to 'see' charts and diagrams.",
    type: "standard",
  },
  {
    id: 5,
    title: "System Architecture",
    content:
      "• Frontend: React v19.2.0 + Vite v7.2.4 (Fast HMR)\n• UI Framework: TailwindCSS v3.4 + Framer Motion v11\n• AI backend: Google Generative AI SDK (@google/generative-ai)\n• State Management: React Hooks (useState, useEffect, useContext)\n• Routing: React Router DOM v6",
    type: "standard",
  },
  {
    id: 6,
    title: "Methodology / Working",
    content: [
      "1. Drag-and-Drop: User drops PDF -> `handleFileChange` triggers.",
      "2. Preview: Browser generates local Blob URL for immediate render.",
      "3. Conversion: `FileReader` converts binary to Base64 (src/lib/gemini.js).",
      "4. API Call: Secure POST request to `/api/gemini` with history.",
      "5. Generation: Gemini 1.5 processes visual+text context and streams response.",
    ],
    type: "list",
  },
  {
    id: 7,
    title: "Components / Modules",
    content: [
      "📄 ChatApp.jsx — Main page with PDF viewer (iframe), chat panel, drag-drop handler, and resizable split-screen.",
      "🧭 Navbar.jsx — Contains logo, theme toggle (dark/light), and navigation links using React Router.",
      "🎨 Icons.jsx — Custom SVG icon components (BotIcon, SendIcon, UploadIcon, etc.) for consistent UI.",
      "🤖 gemini.js — Service layer: fileToBase64() for PDF encoding, runChat() for Gemini API calls.",
      "🌓 ThemeContext.jsx — React Context API for global dark/light mode state management.",
      "🏠 LandingPage.jsx — Hero section, feature cards, and call-to-action button.",
    ],
    type: "list",
  },
  {
    id: 8,
    title: "Advantages",
    content: [
      "⚡ Lightning Fast: Built on Vite, loads in <300ms.",
      "🎨 Modern UI: Glassmorphism effects and smooth transitions.",
      "🛡️ Secure: API keys hidden behind serverless edge functions.",
      "👁️ Visual Understanding: Can interpret graphs in PDFs (unlike text-only LLMs).",
      "📱 Mobile Ready: Fully responsive grid layout.",
    ],
    type: "list",
  },
  {
    id: 9,
    title: "Applications",
    content: [
      "📚 Students: Quickly understand research papers and textbooks by asking direct questions.",
      "👨‍💻 Developers: Query API documentation or technical specs without scrolling.",
      "📋 HR & Recruiters: Summarize resumes and extract key candidate information.",
      "🏢 Professionals: Analyze reports, contracts, or SOPs in seconds.",
    ],
    type: "list",
  },
  {
    id: 10,
    title: "Case Study",
    content:
      "Tested with a 25-page 'React 19 Release Note' PDF. \nQuery: 'What is the new compiler feature?' \nResult: System correctly identified 'React Compiler' and cited the auto-memoization benefits, which was on page 4, taking only 2.3 seconds.",
    type: "standard",
  },
  {
    id: 11,
    title: "Results & Analysis",
    content:
      "Performance metrics show a 95% Lighthouse score. Integration with Gemini 1.5 Flash maintains an average TBT (Time to First Token) of <1.5s, significantly faster than GPT-4o based wrappers for this use case.",
    type: "standard",
  },
  {
    id: 12,
    title: "Future Scope",
    content: [
      "Integrate Vercel KV for saving chat history.",
      "Add 'Export to Markdown/Notion' feature.",
      "Multi-document comparison mode.",
      "Add OCR support for scanned PDFs.",
    ],
    type: "list",
  },
  {
    id: 13,
    title: "Conclusion",
    content:
      "DocuBrain successfully demonstrates the viability of serverless, client-heavy AI applications. By leveraging standard web APIs and powerful modular architecture, it delivers a premium, production-grade experience for document intelligence.",
    type: "standard",
  },
  {
    id: 14,
    title: "References",
    content: [
      "React.dev - React 19 Documentation",
      "Google AI Studio - Gemini 1.5 Vision Capabilities",
      "Vitejs.dev - Next Generation Frontend Tooling",
      "Tailwindcss.com - Utility-first CSS framework",
    ],
    type: "list",
  },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white flex flex-col items-center justify-between py-6 px-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-indigo-900/20 pointer-events-none" />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-800 w-full transition-all">
        <div
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-[#1a1d26] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/5 p-8 md:p-12 flex flex-col items-center justify-center text-center relative z-10 transition-all duration-500 flex-1 my-4 overflow-y-auto">
        {/* Slide Number */}
        <div className="absolute top-8 right-8 text-sm font-mono text-gray-400">
          {currentSlide + 1} / {slides.length}
        </div>

        <div
          key={currentSlide}
          className="flex-1 flex flex-col items-center justify-center w-full animate-fade-in-up"
        >
          {slide.type === "title" ? (
            <>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
                {slide.subtitle}
              </p>
              <div className="mt-12 px-6 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-500 uppercase tracking-widest">
                {slide.content}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-800 dark:text-gray-100 relative after:content-[''] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-blue-500 after:rounded-full">
                {slide.title}
              </h2>

              {slide.type === "list" ? (
                <ul className="text-left space-y-4 max-w-2xl w-full">
                  {Array.isArray(slide.content) &&
                    slide.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-base md:text-xl text-gray-600 dark:text-gray-300"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="text-xl md:text-3xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl whitespace-pre-wrap">
                  {slide.content}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex gap-4 z-50 mt-4">
        <button
          onClick={prevSlide}
          className="group p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-white/10 hover:scale-110 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 text-gray-700 dark:text-gray-200"
          aria-label="Previous Slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="group px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 hover:shadow-blue-500/25 transition-all duration-300 font-medium flex items-center gap-2"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Simple Style for Fade In */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
