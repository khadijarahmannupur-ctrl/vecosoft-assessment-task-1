'use client';

import React, { useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { SUPPORT_CHANNELS, FAQ_ITEMS } from '@/data/mockOrders';
import {
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  Bot,
  User,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface SupportSheetProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export function SupportSheet({ isOpen, onClose, orderNumber }: SupportSheetProps) {
  const [activeTab, setActiveTab] = useState<'options' | 'live_chat'>('options');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello Alex! I am your 24/7 delivery assistant. How can I help you with order #${orderNumber} today?`,
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { showToast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: chatInput,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = chatInput.toLowerCase();
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `I've checked order #${orderNumber}. The driver is currently 12 stops away and is expected to arrive within your scheduled delivery window. Is there anything specific you would like me to note for the driver?`;
      if (query.includes('cancel') || query.includes('refund')) {
        reply = `I can help file a cancellation or refund request for #${orderNumber}. Would you like me to connect you with our billing specialist?`;
      } else if (query.includes('delay') || query.includes('late')) {
        reply = `We track GPS route telematics live. If your package arrives after the guaranteed window, you will receive an automatic $10 store credit.`;
      } else if (query.includes('address') || query.includes('gate')) {
        reply = `I've updated the driver's onboard navigation note with your instructions for gate code & drop-off location.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handlePhoneCall = () => {
    showToast('Connecting you to carrier dispatch line: +1 (800) 555-8920', 'info');
  };

  const handleEmailSupport = () => {
    showToast(`Support email draft opened for #${orderNumber}`, 'success');
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => {
        setActiveTab('options');
        onClose();
      }}
      title={activeTab === 'live_chat' ? 'Live Support Chat' : 'Customer & Delivery Support'}
      description={
        activeTab === 'live_chat'
          ? `Order #${orderNumber} • Dedicated Support Agent`
          : `Fast assistance for order #${orderNumber}`
      }
    >
      {activeTab === 'live_chat' ? (
        <div className="flex flex-col h-[400px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block mt-1 ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-slate-400 pl-8">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </span>
                <span>Agent typing...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about driver ETA, address change..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={() => setActiveTab('options')}
            className="mt-2 text-center text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 py-1"
          >
            ← Back to all support options
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Support Channels */}
          <div className="space-y-2">
            {/* Live Chat Channel */}
            <button
              onClick={() => setActiveTab('live_chat')}
              className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      Start Live Chat
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      Wait: &lt; 1 min
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Direct automated & agent assistance for this package
                  </span>
                </div>
              </div>
            </button>

            {/* Direct Phone Call */}
            <button
              onClick={handlePhoneCall}
              className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                    Call Carrier Dispatch Line
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    +1 (800) 555-8920 (Toll-Free • 7 AM – 11 PM)
                  </span>
                </div>
              </div>
            </button>

            {/* Email Support Ticket */}
            <button
              onClick={handleEmailSupport}
              className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      Submit Priority Support Email
                    </span>
                    <span className="text-[10px] font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded-full">
                      2h SLA
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    support@shopstream.example.com
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Frequently Asked Questions
            </h4>

            <div className="space-y-1.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      aria-expanded={isExpanded}
                    >
                      <span>{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-0 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
