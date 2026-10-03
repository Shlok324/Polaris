'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, X, Send, Bot, User, Compass, ExternalLink, 
  RotateCcw, BookOpen, Layers, HelpCircle, ChevronRight 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: { title: string; type: string; id: string }[];
  suggested_questions?: string[];
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init',
    sender: 'assistant',
    text: "Greetings. I am **POLARIS AI**, your specialized intelligence assistant for India's polar research programs. You can inquire about our stations (Bharati, Maitri, Himadri, Himansh, IndARC), historical expeditions, open scientific datasets, or request simplified educational explanations.",
    suggested_questions: [
      "What is Bharati Research Station?",
      "Show expeditions to Antarctica",
      "What datasets are related to sea ice?",
      "Give me a student-friendly explanation of polar research"
    ],
    timestamp: 'Just now'
  }
];

export const AIChatPanel: React.FC = () => {
  const { isAIModalOpen, setIsAIModalOpen } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAIModalOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAIModalOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await api.aiChat(query);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: res.answer,
        sources: res.sources,
        suggested_questions: res.suggested_questions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "I encountered an issue querying the knowledge repository. Please try asking again.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  if (!isAIModalOpen) {
    return (
      <button
        onClick={() => setIsAIModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#3B261C] hover:bg-[#523528] text-[#FFF8ED] p-3.5 rounded-full shadow-2xl border-2 border-[#B49A82] flex items-center gap-2.5 transition-transform hover:scale-105 group font-mono text-xs"
        aria-label="Open POLARIS AI"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#3B261C]"></span>
        </div>
        <span className="hidden sm:inline font-semibold pr-1">POLARIS AI</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[460px] sm:h-[650px] z-50 flex flex-col bg-[#FFF8ED] border-2 border-[#B49A82] shadow-2xl sm:rounded-2xl overflow-hidden font-sans">
      
      {/* Header */}
      <div className="bg-[#3B261C] text-[#FFF8ED] p-4 flex items-center justify-between border-b border-[#523528]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#523528] flex items-center justify-center text-amber-300 border border-[#76543F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#FFF8ED] leading-none">POLARIS AI</h3>
            <p className="font-mono text-[10px] text-[#D8C2A8] uppercase tracking-wider mt-0.5">
              Polar Scientific Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            className="p-1.5 text-[#D8C2A8] hover:text-[#FFF8ED] hover:bg-[#523528] rounded-md transition-colors"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAIModalOpen(false)}
            className="p-1.5 text-[#D8C2A8] hover:text-[#FFF8ED] hover:bg-[#523528] rounded-md transition-colors"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F4E9D8]/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label */}
            <div className="flex items-center gap-1.5 mb-1 px-1 font-mono text-[10px] text-[#76543F]">
              {msg.sender === 'user' ? (
                <>
                  <span>You</span>
                  <User className="w-3 h-3 text-[#A67C5B]" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-emerald-700" />
                  <span className="font-semibold text-emerald-800">POLARIS Assistant</span>
                </>
              )}
              <span className="text-[#B49A82]">({msg.timestamp})</span>
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[92%] rounded-xl p-3.5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#3B261C] text-[#FFF8ED] rounded-tr-none'
                  : 'bg-[#FFF8ED] text-[#3B261C] border border-[#B49A82] shadow-xs rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">
                {msg.text.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>

              {/* Source Citations */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[#D8C2A8]/70">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#76543F] font-semibold mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Citations & References:</span>
                  </div>
                  <div className="space-y-1">
                    {msg.sources.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs bg-[#F4E9D8] px-2 py-1 rounded text-[#523528] font-mono hover:bg-[#D8C2A8] transition-colors"
                      >
                        <span className="truncate pr-2">[{idx + 1}] {s.title}</span>
                        <span className="text-[10px] uppercase font-bold text-[#76543F] shrink-0">{s.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up Prompts */}
              {msg.suggested_questions && msg.suggested_questions.length > 0 && (
                <div className="mt-3 pt-2 border-t border-[#D8C2A8]/50">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#76543F] mb-1.5 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-amber-700" />
                    <span>Suggested Questions:</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {msg.suggested_questions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-xs text-[#523528] hover:text-[#3B261C] bg-[#F4E9D8]/80 hover:bg-[#D8C2A8] px-2 py-1 rounded transition-colors flex items-center justify-between group"
                      >
                        <span>{q}</span>
                        <ChevronRight className="w-3 h-3 text-[#A67C5B] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#76543F] bg-[#FFF8ED] p-3 rounded-lg border border-[#B49A82] w-fit">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Consulting Polar Knowledge Repositories...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#FFF8ED] border-t border-[#B49A82]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Bharati, sea-ice data, expeditions..."
            className="flex-1 bg-[#F4E9D8]/50 border border-[#B49A82] rounded-lg px-3 py-2 text-sm text-[#3B261C] placeholder-[#76543F]/60 focus:outline-none focus:ring-1 focus:ring-[#76543F]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-[#3B261C] hover:bg-[#523528] disabled:opacity-40 text-[#FFF8ED] rounded-lg transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-1.5 flex justify-between items-center text-[10px] font-mono text-[#76543F]">
          <span>POLARIS AI ENGINE v1.0</span>
          <span>Deterministic Local + LLM Extensible</span>
        </div>
      </div>

    </div>
  );
};
