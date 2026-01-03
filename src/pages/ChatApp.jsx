import { useCallback, useEffect, useRef, useState } from "react";
import {
  BotIcon,
  FileIcon,
  LoaderIcon,
  SendIcon,
  UploadIcon,
  UserIcon,
} from "../components/Icons";
import { runChat } from "../lib/gemini";

export default function ChatApp() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! Upload a PDF to get started." },
  ]);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [leftPanelWidth, setLeftPanelWidth] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const startResizing = useCallback(() => {
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const resize = (e) => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newWidth =
          ((e.clientX - containerRect.left) / containerRect.width) * 100;
        if (newWidth > 20 && newWidth < 80) {
          setLeftPanelWidth(newWidth);
        }
      }
    };

    const stopResizing = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResizing);
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [isDragging]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `I've analyzed **${selectedFile.name}**. What would you like to know?`,
        },
      ]);
    } else if (selectedFile) {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setFileUrl(URL.createObjectURL(droppedFile));
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: `I've analyzed **${droppedFile.name}**. What would you like to know?`,
          },
        ]);
      }
    }
  };

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt) return;

    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await runChat(prompt, file, messages);
      setMessages((prev) => [...prev, { role: "ai", text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "I'm having trouble connecting right now. Please check your API key.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0f1117] text-gray-900 dark:text-gray-100 overflow-hidden font-sans selection:bg-blue-500/30 ${
        isDragging ? "cursor-col-resize select-none" : ""
      }`}
    >
      {/* --- Left Panel: PDF Viewer --- */}
      <div
        style={{ width: `${leftPanelWidth}%` }}
        className="flex flex-col border-r border-gray-200 dark:border-white/5 bg-white dark:bg-[#13161c] relative hidden md:flex"
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 bg-white/50 dark:bg-[#13161c]/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-semibold tracking-wide">
            <FileIcon className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            <span className="text-gray-700 dark:text-gray-200">
              PDF Context
            </span>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="group flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/20 border border-blue-200 dark:border-blue-500/50 hover:border-blue-300 dark:hover:border-blue-400 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-full text-sm font-medium transition-all"
          >
            <UploadIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Upload New</span>
          </button>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Viewer Area */}
        <div
          className={`flex-1 relative flex flex-col items-center justify-center p-4 transition-colors ${
            isDragOver ? "bg-blue-50 dark:bg-blue-900/10" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {fileUrl ? (
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                src={fileUrl}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          ) : (
            <div className="text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/20 max-w-md w-full mx-auto hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm dark:shadow-inner ring-1 ring-gray-200 dark:ring-white/5">
                <FileIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No Document Selected
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Upload a PDF to analyze its content.
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-lg shadow-blue-900/20 font-medium transition-all transform hover:scale-[1.02]"
              >
                Browse Files
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Resizer Handle --- */}
      <div
        className="w-1 bg-gray-200 dark:bg-gray-900 hover:bg-blue-500 cursor-col-resize transition-colors z-50 flex items-center justify-center hidden md:flex border-l border-r border-gray-200 dark:border-white/5 hover:border-blue-500/50"
        onMouseDown={startResizing}
      >
        <div className="w-0.5 h-8 bg-gray-400 dark:bg-gray-700 rounded-full pointer-events-none" />
      </div>

      {/* --- Right Panel: Chat Interface --- */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#0f1117] relative">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BotIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight">
                PDF Assistant
              </h1>
              <div className="flex items-center gap-1.5 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-medium">Online & Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-4 animate-fade-in ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm dark:shadow-none">
                  <BotIcon
                    size={16}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-6 py-4 shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm"
                    : "glass-panel text-gray-800 dark:text-gray-200 rounded-bl-sm"
                }`}
              >
                {/* 
                   We are rendering simple text now to avoid dependency issues, 
                   but styling it with whitespace-pre-wrap works well for basic formatting.
                */}
                <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                  {msg.text.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong
                        key={i}
                        className={
                          msg.role === "ai"
                            ? "text-indigo-600 dark:text-indigo-300 font-semibold"
                            : "font-semibold"
                        }
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </div>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <UserIcon
                    size={16}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 animate-pulse-subtle">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                <BotIcon
                  size={16}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
              <div className="glass-panel rounded-2xl rounded-bl-sm px-6 py-4 flex items-center gap-3">
                <LoaderIcon className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Analyzing document...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-0 bg-transparent relative z-20">
          <div className="relative max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-white/10 shadow-2xl focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all overflow-hidden group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask specific questions about your PDF..."
              className="w-full bg-transparent text-gray-900 dark:text-gray-100 p-5 pr-14 rounded-3xl focus:outline-none resize-none h-[72px] max-h-[160px] placeholder:text-gray-500 text-[15px] leading-relaxed"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !file)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all duration-200 ${
                input.trim()
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              <SendIcon size={18} />
            </button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-3 font-medium">
            Powered by Gemini • AI can make mistakes
          </p>
        </div>
      </div>
    </div>
  );
}
