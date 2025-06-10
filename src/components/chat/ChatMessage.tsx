import { Bot, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex gap-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md",
        isUser 
          ? "bg-primary-100 text-primary-700" 
          : "bg-gradient-to-br from-primary-500 to-cyan-500 text-white"
      )}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Content */}
      <div className={cn(
        "flex-1 max-w-[85%]",
        isUser && "flex justify-end"
      )}>
        <div className={cn(
          "rounded-2xl px-6 py-4 shadow-md",
          isUser 
            ? "bg-primary-600 text-white" 
            : "bg-white border border-gray-100"
        )}>
          {isUser ? (
            <p className="text-base leading-relaxed text-white">
              {content}
            </p>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({children}) => {
                    // Handle single line breaks by checking if the paragraph only contains whitespace
                    const text = String(children);
                    if (text.trim() === '') return null;
                    return <p className="mb-3 last:mb-0 text-gray-800 leading-relaxed">{children}</p>;
                  },
                  h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-3">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-bold text-gray-900 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-semibold text-gray-900 mb-2">{children}</h3>,
                  ul: ({children}) => <ul className="mb-3 list-disc pl-6 text-gray-800">{children}</ul>,
                  ol: ({children}) => <ol className="mb-3 list-decimal pl-6 text-gray-800">{children}</ol>,
                  li: ({children}) => <li className="mb-1">{children}</li>,
                  strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  code: ({children}) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                  pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-3">{children}</pre>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-3">{children}</blockquote>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
          {timestamp && (
            <div className={cn(
              "text-xs mt-3 opacity-70",
              isUser ? "text-white" : "text-gray-500"
            )}>
              {new Date(timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}