import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { INITIAL_MESSAGE } from '../../lib/ai/prompts';
import { Card } from '../ui/card';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: INITIAL_MESSAGE,
      timestamp: new Date().toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Rate limiting state
  const [messageTimestamps, setMessageTimestamps] = useState<number[]>([]);
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number>(5);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean up old timestamps every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const oneMinuteAgo = Date.now() - 60000;
      setMessageTimestamps(prev => prev.filter(ts => ts > oneMinuteAgo));
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Update remaining messages count
  useEffect(() => {
    const oneMinuteAgo = Date.now() - 60000;
    const recentMessages = messageTimestamps.filter(ts => ts > oneMinuteAgo);
    setRateLimitRemaining(Math.max(0, 5 - recentMessages.length));
  }, [messageTimestamps]);

  const handleSendMessage = async (content: string) => {
    setError(null);
    
    // Check client-side rate limit
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentMessages = messageTimestamps.filter(ts => ts > oneMinuteAgo);
    
    if (recentMessages.length >= 5) {
      const oldestMessage = Math.min(...recentMessages);
      const timeUntilReset = Math.ceil((oldestMessage + 60000 - now) / 1000);
      setError(`Rate limit reached. Please wait ${timeUntilReset} seconds before sending another message.`);
      return;
    }
    
    // Update timestamps
    setMessageTimestamps(prev => [...prev.filter(ts => ts > oneMinuteAgo), now]);
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (data.success && data.message) {
        // Add AI response
        const aiMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: data.timestamp || new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{
      role: 'assistant',
      content: INITIAL_MESSAGE,
      timestamp: new Date().toISOString()
    }]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-[60vh] sm:h-[70vh] md:h-[75vh] max-h-[800px] w-full bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
      {/* Sleek Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">Market Research Assistant</h2>
              <p className="text-xs text-gray-500 hidden sm:block">
                Online • {rateLimitRemaining} messages remaining
              </p>
            </div>
          </div>
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages - Cleaner Design */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white">
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500">Analyzing...</span>
            </div>
          )}
          
          {error && (
            <div className="mx-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - Modern Design */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}