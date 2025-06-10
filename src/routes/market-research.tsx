import { createFileRoute } from "@tanstack/react-router"
import { ChatContainer } from "../components/chat/ChatContainer"
import { Badge } from "../components/ui/badge"
import { Card } from "../components/ui/card"
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Shield, 
  BarChart3, 
  Send,
  ArrowRight,
  MessageSquare
} from "lucide-react"
import { motion } from "framer-motion"

export const Route = createFileRoute('/market-research')({
  component: MarketResearchPage,
})

function MarketResearchPage() {
  const examples = [
    "Which vendors offer AI/ML solutions for predictive maintenance?",
    "What cybersecurity training programs are available for government contractors?",
    "Compare cloud infrastructure solutions with FedRAMP High certification",
    "Find vendors specializing in quantum computing research and development"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Minimalist Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 overflow-hidden"
      >
        {/* Subtle Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[50vh] max-h-[400px] bg-gradient-to-b from-primary-100/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-primary-600 to-cyan-600 text-white border-0 px-4 py-1.5 shadow-md">
              <Sparkles className="w-3 h-3 mr-1.5" />
              AI Research Assistant
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 px-2"
          >
            Market Intelligence at Your Fingertips
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2"
          >
            Ask anything about defense technology vendors and solutions. Get instant, AI-powered insights.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Chat Section - Full Focus */}
      <section className="px-4 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Chat Container */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-200 via-cyan-200 to-primary-200 rounded-3xl blur-2xl opacity-30 animate-pulse" />
            
            <div className="relative">
              <ChatContainer />
            </div>
          </div>
          
          {/* Example Queries - Sleeker Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10"
          >
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Try these questions</p>
            </div>
            
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {examples.map((example, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  onClick={() => {
                    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                    if (textarea) {
                      textarea.value = example;
                      // Trigger React's onChange by creating a proper event
                      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLTextAreaElement.prototype,
                        "value"
                      )?.set;
                      if (nativeInputValueSetter) {
                        nativeInputValueSetter.call(textarea, example);
                        const inputEvent = new Event('input', { bubbles: true });
                        textarea.dispatchEvent(inputEvent);
                      }
                      textarea.focus();
                    }
                  }}
                  className="group relative overflow-hidden bg-white rounded-xl p-3 sm:p-4 text-left 
                           border border-gray-200 hover:border-primary-300 
                           shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                      {example}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Send className="w-4 h-4 text-primary-400" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  )
}