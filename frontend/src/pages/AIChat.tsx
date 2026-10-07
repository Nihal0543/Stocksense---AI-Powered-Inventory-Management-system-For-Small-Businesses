import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import type { ChatMessage } from '../types';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { Send, Sparkles, CornerDownLeft } from 'lucide-react';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getSuggestedPrompts = () => [
    t('prompt1'),
    t('prompt2'),
    t('prompt3'),
    t('prompt4')
  ];

  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(getSuggestedPrompts());

  useEffect(() => {
    setSuggestedPrompts(getSuggestedPrompts());
  }, [language]);

  // Initialize with a welcome message from the assistant
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: language === 'hi' 
            ? "### स्टॉकसेंस AI सहायक में आपका स्वागत है\n\nमैं आपके स्टोर के रीयल-टाइम डेटाबेस से जुड़ा हूँ। मैं वर्तमान स्टॉक की जाँच, कल की मांग का पूर्वानुमान, ओवरस्टॉक/स्टॉकआउट जोखिमों की पहचान और पुन: ऑर्डर निर्णयों पर मार्गदर्शन कर सकता हूँ।\n\n*नीचे दिए गए सुझाए गए प्रश्नों पर क्लिक करें या अपना प्रश्न टाइप करें।*"
            : "### Welcome to StockSense AI Assistant\n\nI am connected to your store database. I can inspect current stock levels, predict tomorrow's demand, identify overstock/stockout risks, and advise on restocking decisions in Indian Rupees (₹).\n\n*Click one of the suggested prompts below or type your question in the box.*"
        }
      ]);
    }
  }, [language]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const updatedMessages = [...messages, { role: 'user', content: text } as ChatMessage];
    setMessages(updatedMessages);
    setInputText('');
    setLoading(true);

    try {
      const response = await api.chat(text, updatedMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
      if (response.suggested_prompts && response.suggested_prompts.length > 0) {
        setSuggestedPrompts(response.suggested_prompts);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `**Error**: ${err.message || 'Failed to connect to AI server. Please verify backend is running.'}` 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  // Basic Markdown Helper (handles bold, headers, lists, tables)
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/^### (.*$)/gim, '<h4 class="text-base font-extrabold text-emerald-700 dark:text-emerald-400 mt-4 mb-2">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-lg font-bold text-zinc-950 dark:text-white mt-5 mb-2">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-xl font-extrabold text-zinc-950 dark:text-white mt-6 mb-3">$1</h2>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-zinc-900 dark:text-white">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-zinc-500 dark:text-zinc-400">$1</em>');
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc py-0.5">$1</li>');

    const lines = html.split('\n');
    let inTable = false;
    let tableHtml = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableHtml += '<div class="overflow-x-auto my-4"><table class="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs"><thead>';
        }
        
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        if (cells.every(c => c.startsWith(':---') || c.startsWith('---') || c.startsWith(':---:'))) {
          tableHtml = tableHtml.replace('<thead>', '').replace('</thead>', '');
          tableHtml += '<tbody class="divide-y divide-zinc-200/50 dark:divide-zinc-800/30">';
          continue;
        }
        
        tableHtml += '<tr class="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10">';
        cells.forEach(cell => {
          tableHtml += `<td class="py-2.5 px-3 border-r border-zinc-200 dark:border-zinc-800">${cell}</td>`;
        });
        tableHtml += '</tr>';
      } else {
        if (inTable) {
          inTable = false;
          tableHtml += '</tbody></table></div>';
          lines[i] = tableHtml + '\n' + lines[i];
          tableHtml = '';
        }
      }
    }
    html = lines.join('\n');

    return <div dangerouslySetInnerHTML={{ __html: html }} className="space-y-1.5" />;
  };

  return (
    <div className="h-[calc(100vh-190px)] min-h-[500px] flex flex-col gap-4 animate-fade-in">
      {/* Messages Scroll Box */}
      <GlassCard className="flex-1 overflow-y-auto p-6 flex flex-col space-y-6">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={index}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-5 border text-sm shadow-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none'
                    : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 rounded-tl-none'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                    <Sparkles size={12} />
                    <span>{t('appName')} Assistant</span>
                  </div>
                )}
                {isUser ? <p className="whitespace-pre-wrap">{msg.content}</p> : renderMarkdown(msg.content)}
              </div>
            </div>
          );
        })}
        
        {loading && (
          <div className="flex w-full justify-start">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-none p-5 text-sm shadow-sm flex items-center space-x-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </GlassCard>

      {/* Suggested Prompts Grid */}
      <div className="flex flex-wrap gap-2 py-1">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 text-xs font-semibold px-4 py-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all text-left truncate max-w-sm cursor-pointer select-none"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleFormSubmit} className="flex gap-3 mt-1 relative">
        <input
          type="text"
          disabled={loading}
          placeholder={t('chatInputPlaceholder')}
          className="flex-1 glass-input py-4 pr-24"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="absolute right-3.5 top-3 flex items-center space-x-2">
          <span className="hidden md:flex items-center space-x-0.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mr-2 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
            <span>Enter</span>
            <CornerDownLeft size={10} />
          </span>
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
