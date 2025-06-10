import { createServerFileRoute } from '@tanstack/react-start/server'
import { json } from '@tanstack/react-start'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { formatVideoMetadataForAI } from '../lib/ai/context'
import { SYSTEM_PROMPT, createUserPrompt } from '../lib/ai/prompts'
import { isRateLimited } from '../lib/rateLimiter'

// Initialize Gemini - get API key at runtime
const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY || ''
  console.log('API Key exists:', !!apiKey)
  console.log('API Key length:', apiKey.length)
  console.log('First 10 chars:', apiKey.substring(0, 10))
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set')
  }
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
}

export const ServerRoute = createServerFileRoute('/api/chat').methods({
  POST: async ({ request }) => {
    try {
      const body = await request.json()
      const { message, history = [] } = body ?? {}

      // Rate-limit early to minimise resource consumption
      const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '').split(',')[0].trim() || 'unknown'
      const { limited, retryAfter } = isRateLimited(ip, {
        max: 5, // max requests
        windowMs: 60 * 1000, // per 60s window
      })

      if (limited) {
        return json(
          {
            success: false,
            error: 'Rate limit exceeded. Please slow down.',
            timestamp: new Date().toISOString(),
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter?.toString() ?? '60',
            },
          },
        )
      }

      // Validate message
      if (!message || typeof message !== 'string') {
        return json(
          {
            success: false,
            error: 'Invalid message',
          },
          { status: 400 },
        )
      }

      // Enforce message length limit
      const MAX_MESSAGE_LENGTH = 500
      if (message.length > MAX_MESSAGE_LENGTH) {
        return json(
          {
            success: false,
            error: `Message too long. Maximum length is ${MAX_MESSAGE_LENGTH} characters.`,
          },
          { status: 413 },
        )
      }

      // Format the context with all video metadata
      const videoContext = formatVideoMetadataForAI()
      
      // Create the conversation history for Gemini
      const conversationHistory = [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I\'m ready to help users find the right defense technology solutions.' }]
        },
        // Add previous conversation history (cap to last 10 messages)
        ...history.slice(-10).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })),
        // Add current message with context
        {
          role: 'user',
          parts: [{ text: createUserPrompt(message, videoContext) }]
        }
      ]

      // Start chat session
      const model = getGeminiModel()
      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      })

      // Get response
      const result = await chat.sendMessage(message)
      const response = await result.response
      const text = response.text()

      return json({
        success: true,
        message: text,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('AI Chat Error:', error)
      
      // Handle specific errors
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return json({
            success: false,
            error: 'AI service not configured. Please check API settings.',
            timestamp: new Date().toISOString()
          }, { status: 500 })
        }
        
        if (error.message.includes('quota')) {
          return json({
            success: false,
            error: 'AI service quota exceeded. Please try again later.',
            timestamp: new Date().toISOString()
          }, { status: 429 })
        }
      }
      
      return json({
        success: false,
        error: 'An error occurred while processing your request. Please try again.',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  }
})