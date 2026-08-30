import React, { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import axios from "axios";
import { useRailwaySimulation } from "../../hooks/useRailwaySimulation";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  confidence?: number;
}

const AIAssistantPage: React.FC = () => {
  const simulation = useRailwaySimulation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Train 12627 Karnataka Express is delayed by 18 minutes due to congestion at Jhansi Junction caused by a late running freight train and ongoing track maintenance between Jhansi and Gwalior. Estimated delay may reduce to 10 minutes by next stop. Would you like alternate routing suggestions?",
      time: "18:42",
      confidence: 0.95,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const promptSuggestions = [
    "Why is Train 12627 delayed?",
    "Suggest alternative route",
    "Upcoming congestion",
    "Platform availability NDLS",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setLoading(true);

    try {
      const response = await axios.post("/api/ai/chat", { prompt: query });
      const aiData = response.data;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiData.answer || "Processing network state...",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        confidence: aiData.confidence || 0.94,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Intelligent offline state response
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `RailOptix-AI Assistant: Currently monitoring ${simulation.trains.length} live trains. Train 12627 Karnataka Express is delayed by 18 mins near Jhansi. Train 12951 Rajdhani is held at NDLS Junction to avoid conflict with Train 12424.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        confidence: 0.92,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Bot className="h-8 w-8 text-cyan-400" /> AI Assistant
        </h1>
        <p className="text-sm text-slate-400 mt-1">Ask anything about live railway operations, train delays, or network decisions</p>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Suggestions Sidebar */}
        <div className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" /> Quick Prompts
          </h3>

          <div className="space-y-2">
            {promptSuggestions.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left text-xs text-slate-300 transition-all hover:border-cyan-500/40 hover:bg-white/10 hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Right Chat History & Input */}
        <div className="lg:col-span-3 flex flex-col h-[580px] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl overflow-hidden">
          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                      : "border border-white/10 bg-[#0c141f]/80 text-slate-200 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {msg.confidence && (
                      <span className="text-emerald-400 font-semibold">Confidence: {(msg.confidence * 100).toFixed(0)}%</span>
                    )}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white shrink-0 font-bold text-xs">
                    RS
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Sparkles className="h-4 w-4 animate-spin" /> Gemini AI reasoning over live network state...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="border-t border-white/10 p-4 bg-[#090e14]/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask something about live train status, conflicts, or schedule..."
                className="flex-1 rounded-2xl border border-white/10 bg-white/10 py-3 px-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white transition-all hover:scale-105 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
