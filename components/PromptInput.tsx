'use client'

import { useState } from 'react'

interface PromptInputProps {
  onGenerate: (prompt: string) => void
}

export default function PromptInput({ onGenerate }: PromptInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onGenerate(input.trim())
    }
  }

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="歌詞のテーマやキーワードを入力してください（例：青春、恋愛、夢、友情など）..."
          className="w-full px-6 py-4 pr-16 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-gray-900 placeholder-gray-400"
        />
        
        {/* アイコンボタン群 */}
        <div className="absolute left-4 bottom-[-2.5rem] flex items-center gap-2">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            title="Feature 1"
          >
            ✨
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            title="Feature 2"
          >
            S
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            title="Feature 3"
          >
            Z
          </button>
          <span className="text-sm text-gray-500 ml-2">+ 3 more</span>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  )
}

