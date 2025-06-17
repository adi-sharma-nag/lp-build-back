import { memo, useRef, useEffect, useState, useMemo } from 'react'
import { formatTime } from '../../utils/date'
import { Brain, ChevronDown, ChevronUp, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' 

interface MessageProps {
  content: string
  sender: 'user' | 'persona'
  timestamp: Date
  name?: string
  image?: string
  metadata?: {
    thoughts?: string
  }
  persona?: Persona
}

const Message = memo(function Message({ content, sender, timestamp, name, image, metadata, persona }: MessageProps) {
  const isUser = sender === 'user'
  const [isVisible, setIsVisible] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)
  const [showThoughts, setShowThoughts] = useState(false)

  useEffect(() => {
    if (!messageRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(messageRef.current)

    return () => observer.disconnect()
  }, [])

  const messageClasses = useMemo(() => {
    return isUser
      ? 'bg-gradient-to-r from-primary-300 to-primary-400 text-white font-medium rounded-[20px] rounded-br-md hover:from-primary-400 hover:to-primary-500 transition-colors'
      : 'bg-white text-gray-900 font-medium rounded-[20px] rounded-bl-md hover:bg-gray-50 transition-colors border border-gray-200'
  }, [isUser])

  const toggleThoughts = () => {
    setShowThoughts(!showThoughts)
  }

  return (
    <div 
      ref={messageRef}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} opacity-0 translate-y-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
    >
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center border-2 border-white shadow-lg">
          <User className="w-5 h-5 text-primary-400" />
        </div>
      )}
      {!isUser && (
        persona && (
          <img
            src={persona?.avatar}
            alt={persona.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
          />
        )
      )}

      <div className="space-y-1 max-w-[80%]">
        <div
          className={`group relative px-5 py-4 shadow-lg backdrop-blur-sm ${messageClasses}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[20px]" aria-hidden="true" />
          <div className="relative">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Override default elements to match chat styling
                  p: ({ children }) => <p className={`whitespace-pre-wrap mb-2 last:mb-0 ${isUser ? 'text-white font-medium' : 'text-gray-900 font-medium'}`}>{children}</p>,
                  a: ({ href, children }) => (
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${isUser ? 'text-white/90 hover:text-white' : 'text-primary-400 hover:text-primary-500'} underline`}
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => <ul className={`list-disc pl-4 mb-2 last:mb-0 ${isUser ? 'text-white font-medium' : 'text-gray-900 font-medium'}`}>{children}</ul>,
                  ol: ({ children }) => <ol className={`list-decimal pl-4 mb-2 last:mb-0 ${isUser ? 'text-white font-medium' : 'text-gray-900 font-medium'}`}>{children}</ol>,
                  li: ({ children }) => <li className={`mb-1 last:mb-0 ${isUser ? 'text-white font-medium' : 'text-gray-900 font-medium'}`}>{children}</li>,
                  strong: ({ children }) => <strong className={`font-bold ${isUser ? 'text-white' : 'text-gray-900'}`}>{children}</strong>,
                  em: ({ children }) => <em className={`italic ${isUser ? 'text-white' : 'text-gray-900'}`}>{children}</em>,
                  code: ({ children }) => (
                    <code className={`px-1.5 py-0.5 rounded font-mono text-sm ${
                      isUser ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className={`p-3 rounded-lg overflow-x-auto mb-2 last:mb-0 ${
                      isUser ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {children}
                    </pre>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
              {image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={image} 
                    alt="Uploaded content"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
            <div className={`mt-1 text-xs text-opacity-60 ${
              isUser ? 'text-right' : ''
            } ${isUser ? 'text-white/60' : 'text-gray-500'}`}>
              {formatTime(timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Message